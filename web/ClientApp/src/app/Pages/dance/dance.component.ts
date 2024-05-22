import { Component, Inject, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { DanceEpoch, DanceLevel, DanceType } from 'src/app/Models/models';
import { Favorites } from '../favorites/favs.db';
import { FavDance } from "../favorites/favorites.component";

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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService, private favs: Favorites) {
    void route.params.subscribe(params => this.danceId = params["id"]);
    this.getFav();
    this.loadDanceData();
  }

  private loadDanceData() {
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
        return `<a class="vidbtn vid" viddata="${text.substring(4)}">(>) ${text.substring(4)}</a>`;
      } else
        if (prefix == "mov") {
          return `<strong><a href="/move/${href}">${text.substring(4)}</a></strong>`;
        } else
          return `>>> <a href=${href}>${text}</a> <<<`;
    };
  }

  //-- marked click listener
  @HostListener('click', ['$event'])

  onClick(event: any): void {
    console.log("onClick");

    // find button                   
    const vidbtn = event.target.closest("a");
    if (!vidbtn) return;

    let data: string = (vidbtn.getAttribute("viddata"));
    //console.log(data);
    if (!data) return;
    let datas = data.split("-").map((v, i, a) => v.trim());
    console.log(datas);

    // передаем команду плееру
    event.preventDefault();
    this.playFromToFormat(datas[0], datas[1]);
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
    let startMinutes = Number(start.split(':')[0]);
    let startSeconds = Number(start.split(':')[1]);

    let endMinutes = Number(end.split(':')[0]);
    let endSeconds = Number(end.split(':')[1]);

    this.playSegment(startMinutes, startSeconds, endMinutes, endSeconds);
  }

  private _startTime: number = 0;
  private _endTime: number = 0;
  private _loopEnabled = false;

  // проигрывает отрезок видео по времени
  playSegment(startMinutes: number, startSeconds: number, endMinutes: number, endSeconds: number) {
    let player = this.getPlayer();    
    player.pause();

    this._startTime = startMinutes * 60 + startSeconds;
    this._endTime = endMinutes * 60 + endSeconds;
    this._loopEnabled = true;

    player.currentTime(this._startTime);
    player.play();
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