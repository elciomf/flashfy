import express, { Request, Response } from "express";

export const app = express();

app.get("/", (req: Request, res: Response) => {
  const payload = {
    status: "ok",
  };

  res.send(payload);
});

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.VITEST) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
