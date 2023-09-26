import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { SENTRY_DSN } from './utils/secrets';

const app = express();

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV === 'production'
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(compression());

app.use(morgan('dev'));

app.use(cors({
  origin: '*'
}));
app.use(helmet());
app.use(express.json());


// mention endpoint or functions below


// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// eslint-disable-next-line n/handle-callback-err
app.use(function onError (err: any, req: any, res: any, next: any) {
  res.statusCode = 500;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  res.end(res.sentry + '\n');
});

export default app;
