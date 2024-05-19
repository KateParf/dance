import { Component, Inject, AfterViewInit } from '@angular/core';
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

      this.danceScheme = this.markdownService.parse(this.dance.scheme);
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
        return `<strong><a [routerLink]="d" (click)="onPlayTime()" onClick="onPlayTime()" >(>) ${text.substring(4)}</a></strong>`;
      } else
        if (prefix == "mov") {
          console.log(href);
          return `<strong><a href="/move/${href}">${text.substring(4)}</a></strong>`;
        } else
          return `>>> <a href=${href}>${text}</a> <<<`;
    };    
  }


  //-- player

  private player: any;

  public getPlayer() {
    if (!this.player) {
      this.player = videojs('player1');    
      this.player.ready(() => {
        console.log('Player is ready', this.player);
      });
    }
    return this.player;
  }

  public onPlayTime() {
    console.log("play time");
  }

  // проигрывает отрезок видео по времени
  playSegment(startMinutes: number, startSeconds: number, endMinutes: number, endSeconds: number) {
    const startTime = startMinutes * 60 + startSeconds;
    const endTime = endMinutes * 60 + endSeconds;
    var loopEnabled = true;

    let player = this.getPlayer();    
    player.on('timeupdate', () => {
        if (loopEnabled){
            if (player.currentTime() < startTime || player.currentTime() >= endTime ) {
              player.currentTime(startTime);
            }
        }
    });

    player.currentTime(startTime);
    player.play();
  }

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