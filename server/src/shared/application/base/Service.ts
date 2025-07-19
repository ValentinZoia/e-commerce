export abstract class Service<Input extends any[], Output>{
    abstract execute(...data:Input): Promise<Output>;
}