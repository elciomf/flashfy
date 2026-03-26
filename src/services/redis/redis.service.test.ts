import { describe, it, expect, vi } from "vitest";
import Redis from "ioredis";

vi.mock("ioredis", () => {
  return {
    default: vi.fn().mockImplementation(function (this: any) {
      this.set = vi.fn();
      this.get = vi.fn();
      this.del = vi.fn();
      return this;
    }),
  };
});

import { redisService } from "./redis.service";

describe("Redis Service", () => {
  it("should save a value with 10 minutes (600s) expiration", async () => {
    const redisMockInstance = vi.mocked(Redis).mock.results[0].value;
    const { save } = redisService();

    await save("test-key", "test-value");

    expect(redisMockInstance.set).toHaveBeenCalledWith(
      "test-key",
      "test-value",
      "EX",
      600,
    );
  });

  it("should read a value from redis", async () => {
    const redisMockInstance = vi.mocked(Redis).mock.results[0].value;
    const { read } = redisService();

    vi.mocked(redisMockInstance.get).mockResolvedValue("stored-value");

    const result = await read("some-key");

    expect(result).toBe("stored-value");
    expect(redisMockInstance.get).toHaveBeenCalledWith("some-key");
  });
});
