import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { MarkdownService } from 'ngx-markdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DanceEpoch, DanceLevel, DanceType } from 'src/app/Models/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './dance.component.html'
})

export class AdminDanceComponent {
  public dance: Dance = new Dance();
  private danceId: number | undefined;
  public types: DanceType[] = [];
  public epochs: DanceEpoch[] = [];
  public levels: DanceLevel[] = [];

  private baseUrl: string = "";

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", Validators.required),
    type: new FormControl(1, Validators.required),
    epoch: new FormControl(1, Validators.required),
    level: new FormControl(1, Validators.required),
    changePartner: new FormControl(true, Validators.required),
    countOfPairs:  new FormControl(1, Validators.required),
    scheme: new FormControl("", Validators.required),
    history: new FormControl("", Validators.required),
    videos: new FormControl("", Validators.required),
    audios: new FormControl("", Validators.required)
  });

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, 
    route: ActivatedRoute, private router: Router, 
    private markdownService: MarkdownService) {
    
    this.baseUrl = baseUrl;

    http.get<DanceType[]>(baseUrl + 'api/dancetypes').subscribe(result => {
      this.types = result;
    }, error => console.error(error));

    http.get<DanceEpoch[]>(baseUrl + 'api/danceepochs').subscribe(result => {
      this.epochs = result;
    }, error => console.error(error));

    http.get<DanceLevel[]>(baseUrl + 'api/dancelevels').subscribe(result => {
      this.levels = result;
    }, error => console.error(error));

    void route.params.subscribe(params => this.danceId = params["id"]);
    if (this.danceId && (this.danceId > 0)) {
      http.get<Dance>(baseUrl + 'api/dance/' + this.danceId).subscribe(result => {
        this.dance = result;

        this.form.controls["id"].setValue(this.dance.id);
        this.form.controls["name"].setValue(this.dance.name);
        this.form.controls["scheme"].setValue(this.dance.scheme);
        this.form.controls["history"].setValue(this.dance.history);

        this.form.controls["type"].setValue(this.dance.type.id);
        this.form.controls["epoch"].setValue(this.dance.epoch.id);
        this.form.controls["level"].setValue(this.dance.level.id);
        this.form.controls["changePartner"].setValue(this.dance.changePartner);
        this.form.controls["countOfPairs"].setValue(this.dance.countOfPairs);

        let danceVideos = "";
        this.dance.videos.forEach(i => {
          danceVideos += i.name + ";" + i.url + "\n";
        });
        this.form.controls["videos"].setValue(danceVideos);

        let danceAudios = "";
        this.dance.music.forEach(i => {
          danceAudios += i.name + ";" + i.url + "\n";
        });
        this.form.controls["audios"].setValue(danceAudios);

      }, error => console.error(error));
    } else {
      this.dance = new Dance();
    }
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    this.http.post(this.baseUrl + 'api/danceedit', data, {responseType: 'text'})
      //.map(res => res.json())
      .subscribe(
        resdata => {
          console.log("data", resdata);
          if (resdata == data.name) {
            console.log("save ok. goto list");
            this.router.navigate(['/admin/']);
          }
        },
        err => {
          console.log("err", err);
          alert("ERROR POST !!!");
        },
        ()=>console.log("Done")
      );
  }
}

class Dance {
  id: number = 0;
  type: DanceType = {id: 0, name:"", imgName:""};
  epoch: DanceEpoch = {id: 0, name:"", imgName:""};
  level: DanceLevel = {id: 0, name:"", imgName:""};
  changePartner: boolean = true;
  countOfPairs: number = 0;
  name: string = "";
  history: string = "";
  scheme: string = "";
  videos: Media[] = [];
  music: Media[] = [];
}

interface Media {
  name: string;
  url: string;
}