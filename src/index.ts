import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./controllers/user.controller";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = express();
const port = process.env.PORT || 3000;

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

//Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("[SERVER] Connected to database!");
  })
  .catch(() => {
    console.log("[SERVER] Unable to Connect to database!");
  });

// SENTRY RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Cors
app.use(cors());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());
// Logger
app.use(morgan("dev"));

/**
 *
 * ==== Routes ===
 */
app.use("/users", userRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`[SERVER] Server is running on the port ${port}.`);
});
