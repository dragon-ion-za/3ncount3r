export abstract class BaseController<TModel, TViewModel> { 
    public save = async (req: any, res: any, next: any) => {
        try {
            res.send(await this.doSave(req.body as TModel));
        }
        catch (err) {
            next(err);
        }
    }

    public update = async (req: any, res: any, next: any) => {
        try {
            res.send(await this.doUpdate(req.body as TModel));
        }
        catch (err) {
            next(err);
        }
    }

    public get = async (req: any, res: any, next: any) => {
        try {
            let data: TViewModel[] = await this.doGet();
            res.send(data);
        }
        catch (err) {
            next(err);
        }
    }

    public getById = async (req: any, res: any, next: any) => {
        try {
            let id: string = req.params.id;

            let model: TViewModel = await this.doGetById(id);

            res.send(model);
        }
        catch (err) {
            next(err);
        }
    }

    protected abstract doSave(model: TModel) : Promise<string>;
    protected abstract doUpdate(model: TModel) : Promise<string>;
    protected abstract doGet() : Promise<TViewModel[]>;
    protected abstract doGetById(id: string) : Promise<TViewModel>;
}