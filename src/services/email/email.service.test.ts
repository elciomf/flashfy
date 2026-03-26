import { describe, it, expect, vi } from "vitest";
import { Resend } from "resend";

vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(function (this: any) {
      this.emails = {
        send: vi.fn(),
      };
      return this;
    }),
  };
});

import { sendEmail } from "./email.service";

describe("Mail Service", () => {
  it("should return success true when email is sent", async () => {
    const resendMockInstance = vi.mocked(Resend).mock.results[0].value;

    vi.mocked(resendMockInstance.emails.send).mockResolvedValue({
      data: { id: "123" },
      error: null,
      headers: {},
    });

    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Hi</p>",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ id: "123" });
  });

  it("should return success false when Resend returns an error", async () => {
    const resendMockInstance = vi.mocked(Resend).mock.results[0].value;

    vi.mocked(resendMockInstance.emails.send).mockResolvedValue({
      data: null,
      error: {
        name: "validation_error",
        message: "Invalid email",
        statusCode: 422,
      },
      headers: {},
    });

    const result = await sendEmail({
      to: "wrong-email",
      subject: "Test",
      html: "<p>Hi</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toHaveProperty("statusCode", 422);
  });
});
