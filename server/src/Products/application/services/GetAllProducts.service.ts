import { IProductRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Product } from "../../domain/entities";
import { Service } from "../../../shared/application/base";

interface Options {
    category?: string;
    featured?: boolean;
    promotion?: boolean;
    new?: boolean;
    take?:number
    skip?:number
}

export class GetAllProductsService extends Service<[Options], Product[]>{
    constructor(
        private readonly productRepository: IProductRepository,
    ){
        super();
    }

    async execute(options?: Options): Promise<Product[]> {
        const products = await this.productRepository.getAll({
            category: options?.category,
            featured: options?.featured,
            promotion: options?.promotion,
            new: options?.new,
            take: options?.take,
            skip: options?.skip
        });

        if (!products) throw CustomError.notFound("No se encontraron Productos");
            
        

        return products;
    }
}