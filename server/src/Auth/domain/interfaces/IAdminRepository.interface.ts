import { CreateAdminDto } from "../dtos/CreateAdmin.dto";
import { Admin } from "../entities/Admin.entity";

export interface IAdminRepository {
  create(admin: CreateAdminDto): Promise<Admin>;

  findAdminByUsername(username: string): Promise<Admin | null>;

  deleteByUsername(username: string): Promise<void>;
}
