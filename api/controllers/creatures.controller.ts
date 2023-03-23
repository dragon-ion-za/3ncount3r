import { ByoApiService } from "../services/byoapi.service";

export class CreaturesController {

    public static getCreatures = async (req: any, res: any) => {
        res.send(await ByoApiService.searchForCreatures(req.originalUrl.split('?')[1] ?? ''));
    }
}