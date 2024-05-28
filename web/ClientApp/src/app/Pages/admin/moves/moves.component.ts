import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-catalog',
  templateUrl: './moves.component.html'
})
export class AdminMovesComponent {
  public moves: MovesCatalog[] = [];
  private baseUrl: string = "";

  user?: SocialUser;
  loggedIn?: boolean;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: SocialAuthService) {
    http.get<MovesCatalog[]>(baseUrl + 'api/movescatalog').subscribe(result => {
      this.moves = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }  
}

interface MovesCatalog {
  id: number;
  name: string;
}