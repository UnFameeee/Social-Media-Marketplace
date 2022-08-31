import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProviders } from "./database.providers";
import * as Joi from 'joi';

@Module({
    imports: [
      ConfigModule.forRoot({
        validationSchema: Joi.object({
          DB_TYPE: Joi.string(),
          MYSQL_HOST: Joi.string().required(),
          MYSQL_PORT: Joi.number().required(),
          MYSQL_USER: Joi.string().required(),
          MYSQL_PASSWORD: Joi.string().required(),
          MYSQL_DB: Joi.string().required(),
          PORT: Joi.number(),
        })
      }),
    ],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
  })
  
  export class DatabaseModule {}