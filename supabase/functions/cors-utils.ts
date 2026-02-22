// CORS Utility Functions
// Provides secure CORS configuration with origin whitelisting

export function getCorsHeaders(origin?: string): Record<string, string> {
  const allowedOrigins = getAllowedOrigins();

  // Check if origin is in whitelist
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

export function getAllowedOrigins(): string[] {
  const allowed = Deno.env.get("ALLOWED_ORIGINS") || "";

  if (!allowed) {
    // Fallback to local development
    return ["http://localhost:3000", "http://localhost:5173"];
  }

  return allowed
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

export function handleCorsPreFlight(
  origin?: string
): Response {
  const corsHeaders = getCorsHeaders(origin);

  if (!corsHeaders["Access-Control-Allow-Origin"]) {
    return new Response("CORS policy violation", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("ok", {
    status: 204,
    headers: corsHeaders,
  });
}

export function createErrorResponse(
  message: string,
  status: number,
  origin?: string
): Response {
  // Return generic error message to client
  const clientMessage =
    status === 500
      ? "Internal server error"
      : message;

  const corsHeaders = getCorsHeaders(origin);

  return new Response(
    JSON.stringify({ error: clientMessage }),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

export function createSuccessResponse(
  data: any,
  status: number = 200,
  origin?: string
): Response {
  const corsHeaders = getCorsHeaders(origin);

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

/**
 * Validate that request is from an authorized source
 * Accepts either bearer token or service role key
 */
export function validateAuthorization(
  authHeader: string | null,
  serviceRoleKey: string
): { valid: boolean; token: string } {
  if (!authHeader) {
    return { valid: false, token: "" };
  }

  const token = authHeader.replace("Bearer ", "");

  // Service role key (internal use only)
  if (token === serviceRoleKey) {
    return { valid: true, token };
  }

  // User token will be validated by Supabase client
  return { valid: true, token };
}

/**
 * Add rate limiting headers for response
 */
export function addRateLimitHeaders(
  headers: Record<string, string>,
  remaining: number = 100,
  resetTime: number = 3600
): Record<string, string> {
  return {
    ...headers,
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": (Math.floor(Date.now() / 1000) + resetTime).toString(),
    "Retry-After": resetTime.toString(),
  };
}
