
export class Admin {
    constructor(
        public readonly id: string | null ,
        public readonly username: string,
        public readonly password: string,
        
    ) {}

     
}

export type AdminPrivate = {
  id: string;
  username: string;
  password: string;
};

export type AdminPublic = Omit<AdminPrivate, 'password'>;