import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, mobile, localhost, or any vercel.app domain
      if (!origin || origin.includes('localhost') || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      if (process.env.CORS_ORIGIN) {
        const allowed = process.env.CORS_ORIGIN.split(',').map((o) => o.trim());
        if (allowed.includes(origin) || allowed.includes('*')) {
          return callback(null, true);
        }
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
