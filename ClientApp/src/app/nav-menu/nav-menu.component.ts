import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(route: ActivatedRoute, private router: Router) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  form = new FormGroup({
    filterSearch: new FormControl("")
  });

  onEnter() {
    if (this.form.value["filterSearch"]) {
      this.router.navigate(['/dances'], {
        queryParams: { name: this.form.value["filterSearch"] },
      });

      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/dances'], {
          queryParams: { name: this.form.value["filterSearch"] },
        }));
    }
  }
}
