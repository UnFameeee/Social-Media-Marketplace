import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

const port = 4321;
var notify = async () => {
  console.log(`
    Backend host at port ${port}
    Swagger URL: http://localhost:4321/api
  `)
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Social Media Marketplace')
    .setDescription(`
        API endpoint: http://localhost:${port}/
        How to use: { API endpoint + {path} }`)
    .setVersion('1.0')
    .addTag('SMM')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(port, notify);
}
bootstrap();