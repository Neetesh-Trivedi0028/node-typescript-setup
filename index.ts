import app from "./app";
import { config } from "./src/config/env";
import connectDB from "./src/config/db";

// uncaughtException errors
process.on("uncaughtException", (err) => {
  console.info("uncaughtException  🧨🧨 Shutting down ....");
  console.info(err.message);
  console.info(err.name);
  process.exit(1);
});
// database function calling
connectDB();

// server is listening on port
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
