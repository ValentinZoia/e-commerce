import { CustomError, ValidationError } from "../../../shared/domain/errors";
import { BcryptAdapter, JwtAdapter } from "../../../shared/infrastructure/adapters";
import { IAdminRepository } from "../../domain/interfaces";
import { LoginAdminDto } from "../../domain/dtos";
import { Service } from "../../../shared/application/base";


type CompareFunction = (password: string, hashed: string) => boolean;
type TokenResponse = string;

export class LogInAdminService extends Service<[LoginAdminDto], TokenResponse> {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {
    super();
  }

  async execute(loginAdminDto: LoginAdminDto): Promise<TokenResponse> {
    const { username, password } = loginAdminDto;

    //1. Busco si existe un usuario con ese username, si no existe, retorno un error.
    const adminFound = await this.adminRepository.findAdminByUsername(username);
    if (!adminFound) throw new ValidationError({ credentials: ["Credenciales incorrectas"] });
     

    //2. Comparo las contraseñas, si no coinciden, retorno un error.
    const isPasswordMatching = this.comparePassword(
      password,
      adminFound.password
    );
    if (!isPasswordMatching) throw new ValidationError({ credentials: ["Credenciales incorrectas"] });
      

    //3. Si todo esta correcto, creo el token de sesion con la información publica del usuario.
    const token = await JwtAdapter.generateToken({
      id: adminFound.id,
      username: adminFound.username,
    });
    if (!token) throw CustomError.internalServerError("Error al generar JWT");

    return token;
  }
}
