import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  // Create the Nest.js application
  const app = await NestFactory.create(AppModule);

  // Enable CORS if you're working with a frontend app
  app.enableCors();

  // Set up global validation pipes for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that should not be received
      forbidNonWhitelisted: true, // Throw an error if unexpected properties are received
      transform: true, // Automatically transform payloads to be objects typed according to DTOs
    }),
  );

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('YouApp API')
    .setDescription('API Documentation for YouApp backend endpoints')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT Bearer authentication for Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger documentation available at /api

  // Set up RabbitMQ microservice connection
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'], // RabbitMQ URL from environment or default
      queue: 'messages_queue', // Queue name
      queueOptions: {
        durable: false, // Queue options (non-durable means messages will be lost if RabbitMQ server crashes)
      },
    },
  });

  // Start RabbitMQ microservice
  await app.startAllMicroservices();

  // Start the main HTTP server on port 3000 (or from environment)
  await app.listen(process.env.PORT || 3000);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
