import "dotenv/config";
import { DataSource } from "typeorm";

const production = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,

  entities: [],

  synchronize: !production,
  logging: !production,

  ssl: production ? { rejectUnauthorized: false } : false,
});
