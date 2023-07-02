import { Route } from "@angular/router";;
import { LandingComponent } from "../landing/landing.component";
import {
    WebComponentWrapper, WebComponentWrapperOptions
  } from '@angular-architects/module-federation-tools';

export class RouterService {

    private static _appRoutes: Route[];

    public static async initMicroFrontendRoutes(microFrontends: any): Promise<void> {
        this._appRoutes = [
            {
                path: '',
                component: LandingComponent
            },
            ...microFrontends.map((mf: any) => ({
                path: mf.baseUrl,
                component: WebComponentWrapper,
                data: {
                    type: 'module',
                    remoteEntry: mf.remoteEntry,
                    remoteName: mf.remoteName,
                    exposedModule: mf.exposedModule,
                    elementName: mf.elementName,
                } as WebComponentWrapperOptions
            }))
        ];
    }

    public static getAppRoutes(): Route[] {
        return this._appRoutes;
    }
}