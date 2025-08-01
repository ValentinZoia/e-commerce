import prisma from "../../../shared/infrastructure/database/prismaClient";
import { IAdminRepository } from "../../domain/interfaces";
import { ValidationError } from "../../../shared/domain/errors";
import { CreateAdminDTO } from "../../domain/dtos";
import { Admin } from "../../domain/entities";

export class PrismaAdminRepositoryImpl implements IAdminRepository {
  async create(admin: CreateAdminDTO): Promise<Admin> {
    const { username, password } = admin;

    const createdAdmin = await prisma.admin.create({
      data: {
        username: username,
        password: password,
      },
    });

    //Mapear el objeto creado a la entidad Admin
    return this.mapPrismaToAdmin(createdAdmin);
  }

  async findAdminByUsername(username: string): Promise<Admin | null> {
    const existingUser = await prisma.admin.findUnique({
      where: { username },
    });
    if (!existingUser) return null;

    //Mapear el objeto encontrado a la entidad Admin
    return this.mapPrismaToAdmin(existingUser);
  }

  private mapPrismaToAdmin(object: { [key: string]: any }): Admin {
    const { id, _id, username, password } = object;

    if (!_id && !id) throw new ValidationError({ id: ["Missing id"] });

    if (!username)
      throw new ValidationError({ username: ["Missing username"] });

    if (!password)
      throw new ValidationError({ password: ["Missing password"] });

    return new Admin(_id || id, username, password);
  }
}
