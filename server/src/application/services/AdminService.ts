import { Admin, AdminPublic } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/Interfaces/IAdminRepository";
import { IValidator } from "../../domain/Interfaces/IValidator";
import { ValidationError } from "../../infrastructure/validators/ValidationError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AdminService {
  constructor(
    private adminRepository: IAdminRepository,
    private adminValidator: IValidator<Admin>,
    private readonly jwtSecret: string
  ) {}

  //como los datos que envia el usuario no estan validados. es de tipo unknown.
  async createAdmin(adminData: unknown): Promise<AdminPublic> {
    //Validar datos
    const validatedAdmin = await this.adminValidator.validate(adminData);

    //validar que el username no este en uso
    const adminFound = await this.adminRepository.findByUsername(validatedAdmin.username);

    //si existe un usuario con ese username, retorno un error.
    if (adminFound !== null) {
      const error: Record<string, string[]> = {
        username: ["El username ya esta en uso"],
      };
      throw new ValidationError(error);
    }

    //Hashear contraseña
    const hashedPassword = await bcrypt.hashSync(validatedAdmin.password, 10); //poner variable de entorno salt
    
    const admin = new Admin(
      validatedAdmin.id,
      validatedAdmin.username,
      hashedPassword,
    )
    
    //crear admin
    const createdAdmin = await this.adminRepository.create(admin);

    const AdminPublicData: AdminPublic = {
      id: createdAdmin.id as string,
      username: createdAdmin.username,
    };
    return AdminPublicData;
  }

  async login(adminData: unknown): Promise<string | null> {
    //Validar datos
    const validatedAdmin = await this.adminValidator.validate(adminData);

    //busco si existe un usuario con ese username
    const adminFound = await this.adminRepository.findByUsername(validatedAdmin.username);
    
    //si no existe el usuario devuelvo error
    if (!adminFound ) {
      const error: Record<string, string[]> = {
        credentials: ["Credenciales incorrectas"],
      };
      throw new ValidationError(error);
    }
    

    //si las contraseñas no coinciden devuelvo error
    const isPasswordMacth = await adminFound.verifyPassword(validatedAdmin.password);
    if(!isPasswordMacth){
       const error: Record<string, string[]> = {
        credentials: ["Credenciales incorrectas"],
      };
      throw new ValidationError(error);
    }
    

    //si todo esta correcto, creo el token de sesion con la información publica del usuario.
    const token = jwt.sign(
      { id: adminFound.id, username: adminFound.username },
      this.jwtSecret,
      { expiresIn: "5h" }
    );
    return token;
  }
  async verify(token: string): Promise<{ id: string, username:string; } | null> {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as { id: string, username:string };
      return payload;
    } catch (error) {
      return null;
    }
  }
}
