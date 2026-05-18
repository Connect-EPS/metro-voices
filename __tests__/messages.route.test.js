import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../app/lib/supabase.js", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const { GET, POST } = await import("../app/api/messages/route.js");
const { supabase } = await import("../app/lib/supabase.js");

function mockSupabaseData(data, error = null) {
  supabase.from.mockReturnValue({
    select: jest.fn().mockReturnValue({
      order: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue({ data, error }),
      }),
    }),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/messages", () => {
  test("returns a random message when data exists", async () => {
    const messages = [
      { id: 1, content: "Hello" },
      { id: 2, content: "World" },
    ];
    mockSupabaseData(messages);

    const response = await GET();
    const body = await response.json();

    expect(messages).toContainEqual(body);
  });

  test("returns null when there are no messages", async () => {
    mockSupabaseData([]);

    const response = await GET();
    const body = await response.json();

    expect(body).toBeNull();
  });

  test("returns status 500 when supabase returns an error", async () => {
    mockSupabaseData(null, { message: "Database error" });

    const response = await GET();

    expect(response.status).toBe(500);
  });
});

describe("POST /api/messages", () => {
  test("returns the AI filter response on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ allowed: true }),
    });

    const request = {
      json: jest.fn().mockResolvedValue({ content: "Test message" }),
    };

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ allowed: true });
  });

  test("returns status 500 when fetch throws an error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const request = {
      json: jest.fn().mockResolvedValue({ content: "Test message" }),
    };

    const response = await POST(request);

    expect(response.status).toBe(500);
  });
});
