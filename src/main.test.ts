import request from "supertest";
import { describe, it, expect, vi } from "vitest";

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function (this: any) {
    this.emails = {
      send: vi.fn(),
    };
    return this;
  }),
}));

import { app } from "./main";
import { AppDataSource } from "./data-source";

vi.mock("./data-source", () => ({
  AppDataSource: {
    query: vi.fn().mockResolvedValue([{ "?column?": 1 }]),
  },
}));

describe("API Flashfy", () => {
  it("should respond with status ok on /healthz", async () => {
    const res = await request(app).get("/healthz");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", database: "connected" });
  });

  it("should respond with status 500 if database is down", async () => {
    vi.mocked(AppDataSource.query).mockRejectedValueOnce(new Error("DB Down"));

    const res = await request(app).get("/healthz");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ status: "error", database: "disconnected" });
  });
});
