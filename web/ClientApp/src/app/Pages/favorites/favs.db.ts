// реализация хранения тасков в ИндексДБ
import { Injectable, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { dancesTableName, movesTableName } from "./dbConfig";
import { FavDance, FavMove } from "./favorites.component";

@Injectable({
  providedIn: 'root',
})
export class Favorites {

  constructor(private dbService: NgxIndexedDBService) {
  }

  public async addFavDance(dance: FavDance) {
    this.dbService
      .add(dancesTableName, dance)
      .subscribe((key) => {
        console.log('Dance added to favs. key: ', key);
      });
  }

  public deleteFavDance(danceNumber: number) {
    this.dbService.getByIndex<FavDance>(dancesTableName, "globalId", danceNumber).subscribe(
      obj => {
        console.log(obj);
        this.dbService.deleteByKey(dancesTableName, Number(obj.id)).subscribe((status) => {
          console.log('Dance deleted?:', status);
        });
      }
    );
  }

  public async findDance(danceNumber: number): Promise<FavDance> {
    let dance: FavDance = new FavDance();
    await this.dbService.getByIndex<FavDance>(dancesTableName, "globalId", Number(danceNumber)).forEach(
      d => { dance = d as FavDance; }
    );
    return dance;
  }

  public async getFavDances(): Promise<FavDance[]> {
    let allDances: FavDance[] = [];
    await this.dbService.getAll<FavDance>(dancesTableName).forEach(d => { allDances = allDances.concat(d); });
    return allDances;
  }

  public async addFavMove(move: FavMove) {
    this.dbService
      .add(movesTableName, move)
      .subscribe((key) => {
        console.log('Move added to favs. key: ', key);
      });
  }

  public deleteFavMove(moveNumber: number) {
    this.dbService.getByIndex<FavMove>(movesTableName, "globalId", moveNumber).subscribe(
      obj => {
        console.log(obj);
        this.dbService.deleteByKey(movesTableName, Number(obj.id)).subscribe((status) => {
          console.log('Move deleted?:', status);
        });
      }
    );
  }
  public async findMove(moveNumber: number): Promise<FavMove> {
    let move: FavMove = new FavMove();
    await this.dbService.getByIndex<FavMove>(movesTableName, "globalId", Number(moveNumber)).forEach(
      m => { move = m as FavMove; }
    );
    return move;
  }
  public async getFavMoves(): Promise<FavMove[]> {
    let allMoves: FavMove[] = [];
    await this.dbService.getAll<FavMove>(movesTableName).forEach(m => { allMoves = allMoves.concat(m); });
    return allMoves;
  }

  // заполняет базу дефолтными значниями
  public async init() {
    console.log('fillDefault begin');

    // сначала чистим
    this.dbService.clear(dancesTableName).subscribe((successDeleted) => {
      console.log('fillDefault clear. success: ', successDeleted);
    });
    this.dbService.clear(movesTableName).subscribe((successDeleted) => {
      console.log('fillDefault clear. success: ', successDeleted);
    });

    // добавлем в базу
    this.addFavDance(new FavDance({
      type: "1",
      epoch: "1",
      level: "1",
      globalId: 1,
      name: "Вальс"
    }));

    // добавлем в базу
    this.addFavMove(new FavMove({
      globalId: 1,
      name: "Движение"
    }));
  }
}
