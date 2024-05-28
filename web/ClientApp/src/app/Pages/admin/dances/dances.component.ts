import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class AdminDancesComponent {
  public dances: DancesCatalog[] = [];
  private baseUrl: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: SocialAuthService) {
    this.baseUrl = baseUrl;
    this.onSubmitFilter();
  }

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


  onSubmitFilter() {
    console.log("submit filter");

    let filterParams = "?filter";

    filterParams += "&filterPartnerExchYes=true";
    filterParams += "&filterPartnerExchNo=true";

    this.http.get<DancesCatalog[]>(this.baseUrl + 'api/dances' + filterParams).subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
      
}

interface DancesCatalog {
  id: number;
  name: string;
}

