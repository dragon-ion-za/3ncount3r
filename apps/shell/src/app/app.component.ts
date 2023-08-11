import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HelpModal } from './modals/help/help.modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nctr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  currentAppRoot = '';

  constructor (private router: Router, public dialog: MatDialog) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentAppRoot = val.url;
      }
  });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(HelpModal, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
