import { Admin} from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/Interfaces/IAdminRepository";
import prisma from "../database/prismaClient";

export class PrismaAdminRepository implements IAdminRepository{
    async create(admin:Admin): Promise<Admin> {
         const createdAdmin = await prisma.admin.create({
            data:{
                username: admin.username,
                password: admin.password,
            },
         });

         //Ver que es esto
         return this.mapPrismaToAdmin(createdAdmin)
    }

    
    async findByUsername(username:string):Promise<Admin | null> {
      const existingUser = await prisma.admin.findUnique({
          where:{username}
        });
        if(!existingUser) return null
        return this.mapPrismaToAdmin(existingUser)
    }
    
    
    private mapPrismaToAdmin(prismaAdmin: any): Admin {
    return new Admin(
      prismaAdmin.id,
      prismaAdmin.username,
      prismaAdmin.password,
      

    );
  }
}






