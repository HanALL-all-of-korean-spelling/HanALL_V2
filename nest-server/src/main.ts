import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('HanALL API Docs')
    .setVersion('2.0.0')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'accesstoken',
        in: 'header',
      },
      'accesstokenAuth',
    )
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'refreshtoken',
        in: 'header',
      },
      'refreshtokenAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.SWAGGER_URL}/api-docs`, app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
