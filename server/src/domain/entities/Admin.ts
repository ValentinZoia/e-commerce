import bcrypt from "bcryptjs";
export class Admin {
    constructor(
        public readonly id: string ,
        public readonly username: string,
        public readonly password: string,
        
    ) {}

     public async  verifyPassword(password:string):Promise<boolean> {
      const isPasswordCorrect =  await bcrypt.compare(
            password,
            this.password
          );

          
          return isPasswordCorrect
    }
}

export type AdminPrivate = {
  id: string;
  username: string;
  password: string;
};

export type AdminPublic = Omit<AdminPrivate, 'password'>;