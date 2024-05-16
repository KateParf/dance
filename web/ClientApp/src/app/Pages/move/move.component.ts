import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-catalog',
  templateUrl: './move.component.html'
})
export class MoveComponent {
  public move: Move | undefined = undefined;
  private moveId: number | undefined;
  private moveName: string = "";
  public moveDescription: string = "";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService) {
    //void route.params.subscribe(params => this.moveId = params["id"]);
    void route.params.subscribe(params => this.moveName = params["name"]);
    http.get<Move>(baseUrl + 'api/move/' + this.moveName).subscribe(result => {
      this.move = result;
      this.moveDescription = this.markdownService.parse(this.move.description);
    }, error => console.error(error));
  }
}

interface Move {
  id: number;
  name: string;
  description: string;
  videos: Media[];
}
interface Media {
  name: string;
  url: string;
}