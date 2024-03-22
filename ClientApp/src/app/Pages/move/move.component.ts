import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './move.component.html'
})
export class MoveComponent {
  public move: Move | undefined = undefined;
  private moveId: number | undefined;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute) {
    void route.params.subscribe(params => this.moveId = params["id"]);
    http.get<Move>(baseUrl + 'api/move/' + this.moveId).subscribe(result => {
      this.move = result;
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