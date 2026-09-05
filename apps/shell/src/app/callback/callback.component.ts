import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'nctr-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent {
  constructor(private auth: AuthService, private router: Router) {
    auth.handleRedirectCallback();
    router.navigateByUrl('');
  }
}
