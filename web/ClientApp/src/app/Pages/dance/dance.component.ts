import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { DanceEpoch, DanceLevel } from 'src/app/Models/models';


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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService) {
    void route.params.subscribe(params => this.danceId = params["id"]);
        
    http.get<Dance>(baseUrl + 'api/dance/' + this.danceId).subscribe(result => {
      this.dance = result;

      // свой обработчик ссылок
      this.markdownService.renderer.link = (href, title, text) => {  
          let prefix = text.substring(0, 3);
          if (prefix == "vid") {
            return "";//`<strong><a href="" onclick="alert('1111'); return false;" >(>) ${text.substring(4)}</a></strong>`;
          } else
          if (prefix == "mov") {
            console.log(href);
            return `<strong><a href="/move/${text.substring(4)}">${href}</a></strong>`;
          } else
            return `>>> <a href=${href}>${text}</a> <<<`;
      };
      
      this.danceScheme = this.markdownService.parse(this.dance.scheme);
      this.danceHistory = this.markdownService.parse(this.dance.history);
      this.danceEpoch = this.dance.epoch.name;
      this.danceLevel = this.dance.level.name;
    }, error => console.error(error));
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
}

interface Media {
  name: string;
  url: string;
}