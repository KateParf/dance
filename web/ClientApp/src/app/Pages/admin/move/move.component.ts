import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-catalog',
  templateUrl: './move.component.html'
})

export class AdminMoveComponent {
  public move: Move = new Move();
  private moveId: number | undefined;
  private moveName: string = "";
  private baseUrl: string = "";
  user?: SocialUser;
  loggedIn?: boolean;

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    videos: new FormControl("", Validators.required),
  });

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    route: ActivatedRoute, private router: Router,
    private markdownService: MarkdownService,
    private authService: SocialAuthService) {

    this.baseUrl = baseUrl;

    void route.params.subscribe(params => this.moveName = params["name"]);
    if (this.moveName && (this.moveName !== "new")) {
      http.get<Move>(baseUrl + 'api/move/' + this.moveName).subscribe(result => {

        this.move = result;

        this.form.controls["id"].setValue(this.move.id);
        this.form.controls["name"].setValue(this.move.name);
        this.form.controls["description"].setValue(this.move.description);

        let moveVideos = "";

        this.move.videos.forEach(i => {
          moveVideos += i.name + ";" + i.url + "\n";
        });
        this.form.controls["videos"].setValue(moveVideos);

      }, error => console.error(error));
    } else {
      this.move = new Move();
    }  
  }
  
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  } 

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    this.http.post(this.baseUrl + 'api/moveedit', data, { responseType: 'text' })
      //.map(res => res.json())
      .subscribe(
        resdata => {
          console.log("data", resdata);
          if (resdata == data.name) {
            console.log("save ok. goto list");
            this.router.navigate(['/admin/moves']);
          }
        },
        err => {
          console.log("err", err);
          alert("ERROR POST !!!");
        },
        () => console.log("Done")
      );
  }
}

class Move {
  id: number = 0;
  name: string = "";
  description: string = "";
  videos: Media[] = [];
}

interface Media {
  name: string;
  url: string;
}