import "reflect-metadata";
import express, { Request, Response } from "express";

import { AppDataSource } from "./data-source";

export const app = express();

app.get("/healthz", async (req: Request, res: Response) => {
  try {
    await AppDataSource.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.VITEST) {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database successfully connected");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("Unable to connect to the database:", error);
      process.exit(1);
    });
}
