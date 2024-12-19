import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'nctr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
  currentAppRoot = '';
  public loggedIn = false;

  constructor (public auth: AuthService, private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentAppRoot = val.url;
      }
    });
  }

  public async doLogin() {
    await this.auth.loginWithRedirect({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
  }

  public async doLogout() {
    await this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
