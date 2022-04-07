import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./routes/user.routes";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import helmet from "helmet";
import csrf from "csurf";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { userAgent } from "./middleware";

const app = express();
const port = process.env.PORT || 5100;

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

// ===================================== MIDDLEWARE ========================================

/** SENTRY RequestHandler creates a separate execution context using domains, so that every
 * transaction/span/breadcrumb is attached to its own Hub instance
 * */
app.use(Sentry.Handlers.requestHandler());
/**
 * TracingHandler creates a trace for every incoming request
 */
app.use(Sentry.Handlers.tracingHandler());

/**
 * Cors Headers middle-ware
 */
app.use(cors());
/**
 * Parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Parse application/json
 */
app.use(bodyParser.json());
/**
 * Helmet protects the app from some well-known web vulnerabilities
 * by setting HTTP headers appropriately.
 */
app.use(helmet());
/**
 * Block Cross-Site Request Forgeries
 */
app.use(csrf());
/**
 * User Agent middleware
 */
app.use(userAgent());
/**
 * Log each request to the console
 */
app.use(morgan("dev"));

// ===================================== ROUTES ========================================
app.use("/users", userRouter);

// Swagger documentation route
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("./swagger.yaml"))
);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`[SERVER] Server is running on the port ${port}.`);
});
