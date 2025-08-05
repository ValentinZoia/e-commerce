import { CustomError } from "../../../shared/domain/errors";

import { IAdminRepository } from "../../domain/interfaces";

import { Service } from "../../../shared/application/base";

export class DeleteAdminService extends Service<[string], void> {
  constructor(private readonly adminRepository: IAdminRepository) {
    super();
  }

  async execute(username: string): Promise<void> {
    //Verificar que exista el usuario a eliminar
    const existingCategory = await this.adminRepository.findAdminByUsername(
      username
    );
    if (!existingCategory) {
      throw CustomError.notFound("Usuario a eliminar no encontrada");
    }
    await this.adminRepository.deleteByUsername(username);
  }
}
