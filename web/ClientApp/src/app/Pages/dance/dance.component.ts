import { Component, Inject, HostListener, ElementRef, ViewChild, AfterViewInit, AfterContentInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { DanceEpoch, DanceLevel, DanceType } from 'src/app/Models/models';
import { Favorites } from '../favorites/favs.db';
import { FavDance } from "../favorites/favorites.component";
import { DOCUMENT } from '@angular/common';

declare var videojs: any;

@Component({
  selector: 'app-catalog',
  templateUrl: './dance.component.html'
})
export class DanceComponent {

  public dance: Dance | undefined = undefined;
  private danceId: number = 0;
  public danceScheme: string = "";
  public danceHistory: string = "";
  public danceLevel: string = "";
  public danceEpoch: string = "";
  public danceType: string = "";
  public seqFrom: string = "";
  public seqTo: string = "";

  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string, 
    @Inject(DOCUMENT) private document: Document,
    route: ActivatedRoute, 
    private renderer: Renderer2,
    private markdownService: MarkdownService, 
    private favs: Favorites) 
  {
    void route.params.subscribe(params => this.danceId = params["id"]);
    this.getFav();
    this.loadDanceData();
  }

  
  private loadDanceData() {
    console.log("loadDanceData");
    this.http.get<Dance>(this.baseUrl + 'api/dance/' + this.danceId).subscribe(result => {
      this.dance = result;

      this.setupMarkdownRenderer();

      this.danceScheme = this.markdownService.parse(this.dance.scheme, { disableSanitizer: true, });
      this.danceHistory = this.markdownService.parse(this.dance.history);
      this.danceEpoch = this.dance.epoch.name;
      this.danceLevel = this.dance.level.name;
      this.danceType = this.dance.type.name;

    }, error => console.error(error));
  }

  private setupMarkdownRenderer() {
    // свой обработчик ссылок
    this.markdownService.renderer.link = (href, title, text) => {
      let prefix = text.substring(0, 3);
      if (prefix == "vid") {
        return `<button class="vidbtn vid" viddata="${text.substring(4)}" >(>) ${text.substring(4)}</button>`;
      } else
        if (prefix == "mov") {
          return `<strong><a href="/move/${href}">${text.substring(4)}</a></strong>`;
        } else
          return `>>> <a href=${href}>${text}</a> <<<`;
    };
  }

  //--- click

  /*
  ngAfterViewChecked() {
    if (this.checked > 10) return;
    console.log("xxx1");
    this.checked++;

    let ds = document.getElementById("danceScheme");
    //console.log(ds);
    if (ds) {
      let bts = ds.getElementsByTagName("button");
      if (bts) {
        //console.log("b", bts.length, bts);
        for (let i=0; i < bts.length; i++) {
          //console.log(bts[i]);
          this.renderer.listen(bts[i], 'click', ()=>this.playFromToFormat2("00:11","00:16"));
        }
      }
    }    
  }
  */

  //-- marked click listener
  @HostListener('click', ['$event'])

  onClick(event: any): boolean {
    console.log("onClick");

    //this.clickOutside.emit();
    //this.clickOutside.complete();
 
    // find button                   
    const vidbtn = event.target.closest("button");
    if (!vidbtn) return true;

    let data: string = (vidbtn.getAttribute("viddata"));
    //console.log(data);
    if (!data) return true;
    let datas = data.split("-").map((v, i, a) => v.trim());
    console.log(datas);

    // передаем команду плееру
    this.playFromToFormat(datas[0], datas[1]);
    console.log("onClick end");
    event.preventDefault();
    event.stopPropagation();
    return false;
  }


  //-- player

  private player: any;

  public getPlayer() {
    if (!this.player) {
      this.player = videojs('player1');
      
      this.player.ready(() => {
        console.log('Player is ready', this.player);
        
        this.player.on('timeupdate', () => {
          if (this._loopEnabled) {
            if (this.player.currentTime() < this._startTime || this.player.currentTime() >= this._endTime) {
              this.player.currentTime(this._startTime);
            }
          }
        });
        
      });
    }
    return this.player;
  }

  public playFromToFormat(start: string, end: string) {
    console.log("play from ", start, " to ", end);

    let startMinutes = Number(start.split(':')[0]);
    let startSeconds = Number(start.split(':')[1]);
    let endMinutes = Number(end.split(':')[0]);
    let endSeconds = Number(end.split(':')[1]);

    this.seqFrom = "c " + start;
    this.seqTo = " по " + end;

    this.playSegment(startMinutes, startSeconds, endMinutes, endSeconds);
  }

  private _startTime: number = 0;
  private _endTime: number = 0;
  private _loopEnabled = false;

  // проигрывает отрезок видео по времени
  async playSegment(startMinutes: number, startSeconds: number, endMinutes: number, endSeconds: number) {
    let player = this.getPlayer();    
    player.pause();

    this._startTime = startMinutes * 60 + startSeconds;
    this._endTime = endMinutes * 60 + endSeconds;
    this._loopEnabled = true;

    player.currentTime(this._startTime);
    //player.play();
    player.autoplay('any');
  }

  // останавливает зацикливание
  stopRound() {
    console.log("Остановить цикл");
    this._startTime = 0;
    this._endTime = 9999;
    this.seqFrom = "";
    this.seqTo = "";
    this._loopEnabled = false;
  }

  // устанавливает скорость видео
  setPlaybackRate(rate: number) {
    this.getPlayer().playbackRate(rate);
  }


  //-- favorites
  
  public inFav: boolean = false;

  async getFav() {
    this.inFav = (await this.favs.findDance(this.danceId)) != undefined;
  }

  onAddToFav(dance: Dance) {
    if (!this.inFav) {
      let newFavDance = new FavDance();
      newFavDance.globalId = this.dance?.id;
      newFavDance.name = this.dance?.name;
      newFavDance.type = this.danceType;
      newFavDance.level = this.danceLevel;
      newFavDance.epoch = this.danceEpoch;

      this.favs.addFavDance(newFavDance);
    }
    this.inFav = true;
  }

  onRemoveFromFav(dance: Dance) {
    if (this.inFav) {
      this.favs.deleteFavDance(dance.id);
    }
    this.inFav = false;
  }
}

interface Dance {
  id: number;
  name: string;
  history: string;
  scheme: string;
  videos: Media[];
  music: Media[];
  epoch: DanceEpoch;
  level: DanceLevel;
  type: DanceType;
}

interface Media {
  name: string;
  url: string;
}