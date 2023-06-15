import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  /*{
    path: 'test',
    loadChildren: () =>
      loadRemoteModule('test', './Module').then((m) => m.RemoteEntryModule),
  },*/
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
