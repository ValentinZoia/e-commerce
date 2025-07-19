import 'dotenv/config';
import {get} from 'env-var';

export const envs ={
    PORT: get('PORT').required().asPortNumber(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    CORS_ORIGIN: get('CORS_ORIGIN').required().asString(),
    SALT_ROUNDS: get('SALT_ROUNDS').default('10').asIntPositive(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
}

