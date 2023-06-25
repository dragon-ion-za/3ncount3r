import { Route } from "@angular/router";
import { loadRemoteModule } from "@nx/angular/mf";
import { LandingComponent } from "../landing/landing.component";

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
                loadChildren: () => loadRemoteModule(mf.remoteName, mf.moduleName).then(m => m[mf.moduleName])
            }))
        ];
    }

    public static getAppRoutes(): Route[] {
        return this._appRoutes;
    }
}