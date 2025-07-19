import prisma from "./shared/infrastructure/database/prismaClient"
import { AppRoutes } from "./shared/presentation/routes";
import { envs } from "./shared/infrastructure/adapters";
import {Server} from "./server";

(()=> {
  main().catch(async (e) => {
  console.error(e);
  process.exit(1);
}).finally(()=>{
  prisma.$disconnect();
});
})()

async function main(){
    new Server({
        port:envs.PORT,
        routes:AppRoutes.routes
    }).start();
}


