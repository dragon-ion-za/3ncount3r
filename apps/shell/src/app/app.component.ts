import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'nctr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  currentAppRoot = '';

  constructor (private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentAppRoot = val.url;
      }
  });
  }
}
