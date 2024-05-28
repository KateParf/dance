import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }

  user?: any;

  ngOnInit() {
    const userName  = sessionStorage.getItem('GoogleAuthName');
    const userEmail = sessionStorage.getItem('GoogleAuthEmail');
    if (userName && userEmail)
      this.user = {name: userName, email: userEmail};
    else    
      this.authService.authState.subscribe((user) => {
        if (user) {
          this.user = user;
          sessionStorage.setItem('GoogleAuthName', user.name);
          sessionStorage.setItem('GoogleAuthEmail', user.email);
        }
      });
  }  
 
}
