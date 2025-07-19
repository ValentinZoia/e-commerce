import { IProductRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";


export class DeleteProductService extends Service<[string], void>{
    constructor(
        private readonly productRepository: IProductRepository,
    ){
        super();
    }

    async execute(id: string): Promise<void> {
        //1. Verificar primero que existe el producto a eliminar
        const existingProduct = await this.productRepository.getById(id);
        if(!existingProduct) throw CustomError.notFound("Producto a eliminar no encontrado");

        //2. Eliminar producto
        await this.productRepository.delete(id);
    } 
}