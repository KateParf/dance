import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { DanceEpoch, DanceLevel, DanceType } from 'src/app/Models/models';
import { Favorites } from '../favorites/favs.db';
import { FavDance } from "../favorites/favorites.component";

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
  public inFav: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService, private favs: Favorites) {
    void route.params.subscribe(params => this.danceId = params["id"]);

    this.getFav();
    http.get<Dance>(baseUrl + 'api/dance/' + this.danceId).subscribe(result => {
      this.dance = result;

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

      this.danceScheme = this.markdownService.parse(this.dance.scheme);
      this.danceHistory = this.markdownService.parse(this.dance.history);
      this.danceEpoch = this.dance.epoch.name;
      this.danceLevel = this.dance.level.name;
      this.danceType = this.dance.type.name;
    }, error => console.error(error));
  }

  //-- player

  public onPlayTime() {
    console.log("play time");
  }

  //-- favorites
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