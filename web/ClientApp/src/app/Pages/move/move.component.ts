import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { Favorites } from '../favorites/favs.db';
import { FavMove } from "../favorites/favorites.component";

@Component({
  selector: 'app-catalog',
  templateUrl: './move.component.html'
})
export class MoveComponent {
  public move: Move | undefined = undefined;
  private moveName: string = "";
  public moveDescription: string = "";
  public inFav: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private markdownService: MarkdownService, private favs: Favorites) {
    //void route.params.subscribe(params => this.moveId = params["id"]);   
    void route.params.subscribe(params => {
      this.moveName = params["name"];
      http.get<Move>(baseUrl + 'api/move/' + this.moveName).subscribe(result => {
        this.move = result;
        this.moveDescription = this.markdownService.parse(this.move.description);
        this.getFav();
      }, error => console.error(error));
    });
  }

  onAddToFav(move: Move) {
    if (!this.inFav) {
      let newFavMove = new FavMove();
      newFavMove.globalId = this.move?.id;
      newFavMove.name = this.move?.name;

      this.favs.addFavMove(newFavMove);
    }
    this.inFav = true;
  }

  async getFav() {
    this.inFav = (await this.favs.findMove(Number(this.move?.id))) != undefined;
  }

  onRemoveFromFav(move: Move) {
    if (this.inFav) {
      this.favs.deleteFavMove(move.id);
    }
    this.inFav = false;
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