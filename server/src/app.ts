import { envs } from "./shared/infrastructure/adapters";
import { createServer } from "./server";

const server = createServer();

server.listen(envs.PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`🚀 Servidor corriendo en puerto ${envs.PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
  }
});
