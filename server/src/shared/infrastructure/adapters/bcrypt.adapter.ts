import { compareSync, hashSync } from "bcryptjs"
import { envs } from "./envs";

const SALT_ROUNDS = envs.SALT_ROUNDS;


export class BcryptAdapter {
    static hash(password:string): string {
        
        return hashSync(password, SALT_ROUNDS);
    };

    static compare(password:string, hashed:string): boolean{
        return compareSync(password, hashed);
    }
}