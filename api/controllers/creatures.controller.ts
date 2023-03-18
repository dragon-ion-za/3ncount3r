import { ByoApiService } from "../services/byoapi.service";

export class CreaturesController {

    public static getCreatures = (req: any, res: any) => {
        res.send(ByoApiService.searchForCreatures(req.originalUrl.split('?')[1] ?? ''));
    }
}