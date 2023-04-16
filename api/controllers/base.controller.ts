export abstract class BaseController<TModel, TViewModel> { 
    public save = async (req: any, res: any) => {
        res.send(await this.doSave(req.body as TModel));
    }

    public update = async (req: any, res: any) => {
        res.send(await this.doUpdate(req.body as TModel));
    }

    public get = async (req: any, res: any) => {
        let data: TViewModel[] = await this.doGet();
        res.send(data);
    }

    public getById = async (req: any, res: any) => {
        let id: string = req.params.id;

        let model: TViewModel = await this.doGetById(id);

        res.send(model);
    }

    protected abstract doSave(model: TModel) : Promise<string>;
    protected abstract doUpdate(model: TModel) : Promise<string>;
    protected abstract doGet() : Promise<TViewModel[]>;
    protected abstract doGetById(id: string) : Promise<TViewModel>;
}