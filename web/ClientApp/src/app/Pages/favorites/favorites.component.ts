import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorites } from './favs.db';

@Component({
  selector: 'app-catalog',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  public moves: FavMove[] = [];
  public dances: FavDance[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private favs: Favorites) {
    //favs.init();
    this.getDances();
    this.getMoves();
  }

  async getDances() {
    this.dances = await this.favs.getFavDances();
  }
  async getMoves() {
    this.moves = await this.favs.getFavMoves();
  }
}

export class FavDance {
  id?: number | null;
  globalId: number | undefined;
  name: string | undefined;
  type: string | undefined;
  level: string | undefined;
  epoch: string | undefined;

  constructor(init?: Partial<FavDance>) {
    Object.assign(this, init);
  }
}

export class FavMove {
  id?: number | null;
  globalId: number | undefined;
  name: string | undefined;

  constructor(init?: Partial<FavMove>) {
    Object.assign(this, init);
  }
}
