import { IProductRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Product } from "../../domain/entities";
import { Service } from "../../../shared/application/base"


export class GetProductByNameService extends Service<[string], Product>{
    constructor(
        private readonly productRepository:IProductRepository,
    ){
        super();
    }

    async execute(name: string): Promise<Product> {
        const product = await this.productRepository.getByName(name);
        if(!product || product === null) throw CustomError.notFound(`Producto con nombre "${name}" no encontrado`);
        return product;
    }
}