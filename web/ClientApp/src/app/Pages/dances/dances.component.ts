import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DanceEpoch } from 'src/app/Models/models';
import { DanceType } from 'src/app/Models/models';
import { DanceLevel } from 'src/app/Models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class DancesComponent implements OnInit {
  public dances: DancesCatalog[] = [];
  public types: DanceType[] = [];
  public epochs: DanceEpoch[] = [];
  public levels: DanceLevel[] = [];

  private baseUrl: string = "";
  private queryType: number | null = null;
  private queryLevel: number | null = null;
  private queryEpoch: number | null = null;
  private queryName: String | null = null;

  form = new FormGroup({
    filterType: new FormControl(0, Validators.required),
    filterEpoch: new FormControl(0, Validators.required),
    filterLevel: new FormControl(0, Validators.required),
    filterPartnerExchYes: new FormControl(true, Validators.required),
    filterPartnerExchNo: new FormControl(true, Validators.required),
    filterCountOfPartners: new FormControl(undefined, Validators.required),
    filterCountOfPartnersR: new FormControl(undefined, Validators.required),
  });

  ngOnInit() {
    // обрабатываем изменения инпута и ползунка, меняем друг дружке значения
    this.form.controls["filterCountOfPartners"].valueChanges.subscribe(data => {
      this.form.controls["filterCountOfPartnersR"].setValue(data, { emitEvent: false });
    });
    this.form.controls["filterCountOfPartnersR"].valueChanges.subscribe(data => {
      this.form.controls["filterCountOfPartners"].setValue(((data || 0) > 0) ? data : null, { emitEvent: false });
    });
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router) {
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

    // берем св-ва из адресной строки
    this.route.queryParams.subscribe(params => {
      this.queryType = (params['type']) ? Number(params['type']) : null;
      this.queryLevel = (params['level']) ? Number(params['level']) : null;
      this.queryEpoch = (params['epoch']) ? Number(params['epoch']) : null;
      this.queryName = (params['name']) ? String(params['name']) : null;
    });
    this.form.controls["filterType"].setValue(this.queryType);
    this.form.controls["filterEpoch"].setValue(this.queryEpoch);
    this.form.controls["filterLevel"].setValue(this.queryLevel);

    this.onSubmitFilter();
  }

  onClearFilter() {
    this.queryName = null;
    console.log("clear filter");
  }

  onSubmitFilter() {
    console.log("submit filter");

    let filterParams = "?filter";

    if (this.form.value["filterType"])
      filterParams += "&filterType=" + this.form.value["filterType"];
    if (this.form.value["filterLevel"])
      filterParams += "&filterLevel=" + this.form.value["filterLevel"];
    if (this.form.value["filterEpoch"])
      filterParams += "&filterEpoch=" + this.form.value["filterEpoch"];
    filterParams += "&filterPartnerExchYes=" + this.form.value["filterPartnerExchYes"];
    filterParams += "&filterPartnerExchNo=" + this.form.value["filterPartnerExchNo"];
    if (this.form.value["filterCountOfPartners"])
      filterParams += "&filterCountOfPartners=" + this.form.value["filterCountOfPartners"];
    if (this.queryName) 
      filterParams += "&filterSearch=" + this.queryName;

    this.http.get<DancesCatalog[]>(this.baseUrl + 'api/dances' + filterParams).subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
  type: DanceType;
  level: DanceLevel;
  epoch: DanceEpoch;
}

