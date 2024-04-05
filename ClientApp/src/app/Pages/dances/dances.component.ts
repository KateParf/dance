import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DanceEpoch } from 'src/app/Models/models';
import { DanceType } from 'src/app/Models/models';
import { DanceLevel } from 'src/app/Models/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class DancesComponent {
  public dances: DancesCatalog[] = [];
  public types: DanceType[] = [];
  public epochs: DanceEpoch[] = [];
  public levels: DanceLevel[] = [];

  private baseUrl: string = "";

  form = new FormGroup({
    filterType:  new FormControl(undefined, Validators.required),
    filterEpoch: new FormControl(undefined, Validators.required),
    filterLevel: new FormControl(undefined, Validators.required),
    filterPartnerExch: new FormControl(undefined, Validators.required),
  });

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
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
    

    this.onSubmitFilter();

  }

  onClearFilter() {
    console.log("clear filter");
  }
  
  onSubmitFilter() {
    console.log("submit filter");

    console.log(this.form.value);
    let filterParams = "?filter";
    
    if (this.form.value["filterType"])
      filterParams += "&filterType=" + this.form.value["filterType"]; 
    if (this.form.value["filterLevel"])
      filterParams += "&filterLevel=" + this.form.value["filterLevel"]; 
    if (this.form.value["filterEpoch"])
      filterParams += "&filterEpoch=" + this.form.value["filterEpoch"]; 
    filterParams += "&filterPartnerExch=" + this.form.value["filterPartnerExch"]; 

    this.http.get<DancesCatalog[]>(this.baseUrl + 'api/dances' + filterParams).subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
}

