import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  SERVER_URL: get("SERVER_URL").required().asString(),
  GITHUB_TOKEN: get("GITHUB_TOKEN").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  CORS_ORIGIN: get("CORS_ORIGIN").required().asString(),
  SALT_ROUNDS: get("SALT_ROUNDS").default("10").asIntPositive(),
  DATABASE_URL_PROD: get("DATABASE_URL_PROD").required().asString(),
  DATABASE_URL_DEV: get("DATABASE_URL_DEV").required().asString(),
  DATABASE_URL_TEST: get("DATABASE_URL_TEST").required().asString(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
};
