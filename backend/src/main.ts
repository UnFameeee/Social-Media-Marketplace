import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/utils/http-exception.filter';

const port = process.env.LOCALHOST_PORT || 4321;
const apiURL = process.env.API_URL || 'http://127.0.0.1'
const prefixURL = process.env.PREFIX_URL || 'api'

var notify = async () => {
  console.log(`
    Backend host at port ${port}
    Swagger URL: ${apiURL}:${port}/${prefixURL}
  `)
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Social Media Marketplace')
    .setDescription(`
        API endpoint: ${apiURL}:${port}/
        How to use: { API endpoint + {path} }`)
    .setVersion('1.0')
    .addTag('SMM')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: "itsavedaworld-SMM"
  });
  
  await app.listen(port, notify);
}
bootstrap();