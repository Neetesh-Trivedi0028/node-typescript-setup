import fs from "fs";
import path from "path";
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import { validateHeaders } from "./src/middlewares/validate-headers-middleware";
import { apiRoutes } from "./src/constants/apiRoutes";
import authRoutes from "./src/routes/auth-routes";
import { sendApiError } from "./src/responseHandler/responsesHelper";
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "./src/constants/statusCodes";
import logger from "./src/utils/logger";
import handleTokenExpiration from "./src/middlewares/auth-middleware";

const app = express();

// Middleware

// Body size limiting to prevent large request payloads (e.g., file uploads)
app.use(express.json({ limit: "10kb" })); // Limiting the JSON payload size

/* Helmet helps secure  API by setting various HTTP headers such 
as XSS 
*/

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        styleSrc: ["'self'", "trusted-cdn.com"],
      },
    },
    xssFilter: true, // Adds X-XSS-Protection header to prevent XSS attacks
  })
);

// Strict-Transport-Security (HSTS) Forces browsers to use HTTPS for future requests to your server.

app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Include subdomains for HTTPS enforcement
  })
);

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

app.use(limiter);

// Prevent NoSQL injection by sanitizing MongoDB queries

app.use(mongoSanitize());

app.use(handleTokenExpiration);

//swagger
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./src/docs/swagger.json"), "utf-8")
);
// Swagger options to disable the search bar
// const swaggerOptionstest = {
//   customCss: `
//   .swagger-ui .topbar { display: none; }  /* Hides the top bar */
//   .swagger-ui .filter { display: none; }  /* Hides the search bar */
//   .swagger-ui .download-url-wrapper { display: none; }  /* Hides the 'Explore' button */
//   .swagger-ui .swagger-container { padding-top: 0px; margin-top: 0px; }  /* Removes top padding/margin */
//   .swagger-ui svg { display: none; }  /* Hides the Swagger logo (svg) */
// `,
//   customSiteTitle: "Telepathy VIP Chat Application", // Set a custom title if needed
//   swaggerOptions: {
//     authorizeBtn: false,
//     docExpansion: "none", // Collapse all the tags by default
//     filter: false, // Disable the search bar and 'Explore' button
//   },
// };

const swaggerOptionstest = {
  customCss: `
    .swagger-ui .download-url-wrapper,
    .swagger-ui .download-url-button,
    .swagger-ui .topbar {
      display: none !important; /* Hide specific elements */
    }
  `,
  customSiteTitle: "Telepathy VIP Chat Application", // Set a custom title if needed
  swaggerOptions: {
    authorizeBtn: false,
    docExpansion: "none", // Collapse all the tags by default
    filter: false, // Disable the search bar and 'Explore' button
  },
};

app.use(
  `${apiRoutes.api}${apiRoutes.swagger}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptionstest)
);

//validating headers,
app.use(validateHeaders);

// Routes

app.use(`${apiRoutes.api}`, authRoutes);

// 404 Route Handler: Catch unmatched routes

app.all("*", (req: Request, res: Response) => {
  logger.warn(`Route ${req.originalUrl} not found`);
  return sendApiError(
    res,
    statusCodes.NotFound,
    `Route ${req.originalUrl} not found`
  );
});

// Global Error Handling Middleware

app.use((err: any, res: Response, next: NextFunction) => {
  logger.error(`Error occurred: ${err.message}`); // Log errors
  console.error(err.stack); // Log the error stack for debugging

  // If headers have already been sent, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Send formatted error response using your custom `sendApiError` function
  return sendApiError(
    res,
    err.status || statusCodes.InternalServerError,
    err.message || "An unexpected error occurred"
  );
});

export default app;
