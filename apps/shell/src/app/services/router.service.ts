import { Route } from "@angular/router";
import { NxWelcomeComponent } from "../nx-welcome.component";
import { loadRemoteModule } from "@nx/angular/mf";

export class RouterService {

    private static _appRoutes: Route[];

    public static async initMicroFrontendRoutes(microFrontends: any): Promise<void> {
        this._appRoutes = [
        ];

        this._appRoutes.push(
            ...microFrontends.map((mf: any) => ({
                path: mf.baseUrl,
                loadChildren: () => loadRemoteModule(mf.remoteName, mf.moduleName).then(m => m[mf.moduleName])
            })
        ));
    }

    public static getAppRoutes(): Route[] {
        return this._appRoutes;
    }
}