import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1'; // 경고 메시지 비활성화

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaOption: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
    },
  };
  const title = 'NestJS Boilerplate API';
  const description = 'NestJS Boilerplate API Documentation';
  const version = '1.0.0';

  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/api', app, document);

  // Global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector')),
  );

  // Global pipes for validation and transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // strip properties that don't have decorators
      forbidNonWhitelisted: true, // throw errors if non-whitelisted values are provided
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Connect and start Kafka microservice
  app.connectMicroservice(kafkaOption);
  await app.startAllMicroservices();

  // Start HTTP server
  const port = +process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation is available at: http://localhost:${port}/docs/api`,
  );
}
bootstrap();
