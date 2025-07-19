import { IProductRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Product } from "../../domain/entities";


export class GetProductByIdService extends Service<[string], Product>{
    constructor(
        private readonly productRepository:IProductRepository,
    ){
        super();
    }

    async execute(id: string): Promise<Product> {
        const product = await this.productRepository.getById(id);
        if(!product || product === null) throw CustomError.notFound(`Producto con id "${id}" no encontrado`);
        return product;
    }
}