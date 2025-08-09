import { BcryptAdapter } from "../../../shared/infrastructure/adapters";
import { ValidationError } from "../../../shared/domain/errors";
import { IAdminRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CreateAdminDto } from "../../domain/dtos";

export interface PublicUserResponse {
  id: string;
  username: string;
}

type HashFunction = (password: string) => string;

export class CreateAdminService extends Service<
  [CreateAdminDto],
  PublicUserResponse
> {
  constructor(
    private adminRepository: IAdminRepository,
    private readonly hashPassword: HashFunction = BcryptAdapter.hash
  ) {
    super();
  }

  async execute(createUserDto: CreateAdminDto): Promise<PublicUserResponse> {
    const { username, password } = createUserDto;

    // 1. Validar que el username no este en uso
    const adminFound = await this.adminRepository.findAdminByUsername(username);
    if (adminFound !== null)
      throw new ValidationError({ username: ["El username ya esta en uso"] });

    // 2. Hashear contraseña
    const hashedPassword = this.hashPassword(password);
    if (!hashedPassword) {
      throw new ValidationError({ password: ["Error al hashear contraseña"] });
    }

    //3. Crear admin
    const createdAdmin = await this.adminRepository.create({
      id: null,
      username: username,
      password: hashedPassword,
    });

    return {
      id: createdAdmin.id || "",
      username: createdAdmin.username,
    };
  }
}
