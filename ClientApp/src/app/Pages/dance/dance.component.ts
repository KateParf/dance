import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';


@Component({
  selector: 'app-catalog',
  templateUrl: './dance.component.html'
})
export class DanceComponent {
  public dance: Dance | undefined = undefined;
  private danceId: number | undefined;
  public danceScheme: string = "";
  public danceHistory: string = "";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService) {
    void route.params.subscribe(params => this.danceId = params["id"]);
    http.get<Dance>(baseUrl + 'api/dance/' + this.danceId).subscribe(result => {
      this.dance = result;
      this.danceScheme = this.markdownService.parse(this.dance.scheme);
      this.danceHistory = this.markdownService.parse(this.dance.history);
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
}

interface Media {
  name: string;
  url: string;
}