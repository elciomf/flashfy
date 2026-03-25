import request from "supertest";
import { describe, it, expect } from "vitest";

import { app } from "./main";

describe("API Flashfy", () => {
  it("should reponse with status ok", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
