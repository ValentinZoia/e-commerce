import { IAdminRepository } from "../../domain/interfaces";
import { ValidationError } from "../../../shared/domain/errors";
import { BcryptAdapter } from "../../../shared/infrastructure/adapters";
import { CreateAdminDto } from "../../domain/dtos";
import { Service } from "../../../shared/application/base";

interface PublicUserResponse {
  id: string;
  username: string;
}

type HashFunction = (password:string) => string




export class CreateAdminService extends Service<
  [CreateAdminDto],
  PublicUserResponse
> {
  constructor(
      private adminRepository: IAdminRepository,
      private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    ) {
    super();
  }

  async execute(createUserDto: CreateAdminDto): Promise<PublicUserResponse> {
    const { username, password, id } = createUserDto;

    // 1. Validar que el username no este en uso
    const adminFound = await this.adminRepository.findAdminByUsername(username);
    if (adminFound !== null) throw new ValidationError({ username: ["El username ya esta en uso"] });
      

    // 2. Hashear contraseña
    const hashedPassword = this.hashPassword(password);

    //3. Crear admin
    const createdAdmin = await this.adminRepository.create({
      id: id,
      username: username,
      password: hashedPassword,
    });

    return {
      id: createdAdmin.id || "",
      username: createdAdmin.username,
    };
  }
}
