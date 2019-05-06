import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookie from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import _ from 'lodash';
import passport from 'passport';
import { AppModule } from './app.module';
import { ErrorExceptionFilter, ExceptionModule, HttpExceptionFilter } from './core/exception';
import { isLocal } from './core/shared';

async function bootstrap() {
  try {
    const cookieSecret = _.toString(process.env.COOKIE_SECRET);
    const sessionSecret = _.toString(process.env.SESSION_SECRET);
    const clientPath = `${__dirname}\\client`;

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.set('trust proxy', true);
    app.use(compression());
    app.use(helmet());
    app.use(cookie(cookieSecret));
    app.use(
      session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: isLocal() ? true : false },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.useStaticAssets(clientPath);
    app.useGlobalFilters(
      app.select(ExceptionModule).get(ErrorExceptionFilter),
      app.select(ExceptionModule).get(HttpExceptionFilter),
    );

    await app.listen(8080);
  } catch (error) {
    throw error;
  }
}

bootstrap();
