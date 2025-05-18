import { Admin} from "../entities/Admin";

export interface IAdminRepository {
    create(admin:Admin):Promise<Admin>
    
    findByUsername(username: string): Promise<Admin | null>;
}