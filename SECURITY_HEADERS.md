# Security Headers Configuration

This document outlines the recommended security headers for the recruitment landing page automation platform.

## Headers to Configure

### 1. Content-Security-Policy (CSP)

**Purpose:** Prevents XSS attacks by controlling which resources can be loaded

```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' https: data:;
  connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.resend.com https://analytics.google.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
```

### 2. X-Content-Type-Options

**Purpose:** Prevents MIME type sniffing

```
X-Content-Type-Options: nosniff
```

### 3. X-Frame-Options

**Purpose:** Prevents clickjacking attacks

```
X-Frame-Options: DENY
```

### 4. X-XSS-Protection

**Purpose:** Legacy XSS protection (deprecated, but still useful)

```
X-XSS-Protection: 1; mode=block
```

### 5. Referrer-Policy

**Purpose:** Controls referrer information sharing

```
Referrer-Policy: strict-origin-when-cross-origin
```

### 6. Strict-Transport-Security (HSTS)

**Purpose:** Forces HTTPS connections

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 7. Permissions-Policy

**Purpose:** Controls browser features and APIs

```
Permissions-Policy:
  geolocation=(),
  microphone=(),
  camera=(),
  payment=(),
  usb=(),
  magnetometer=(),
  gyroscope=(),
  accelerometer=()
```

## Implementation

### Vercel Configuration (vercel.json)

Add the following to your `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.resend.com https://analytics.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        }
      ]
    }
  ]
}
```

### CORS Configuration (Edge Functions)

All Edge Functions should:

1. **Validate Origin Header:**
   ```typescript
   const origin = req.headers.get("origin");
   const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
   const isAllowed = allowedOrigins.includes(origin);
   ```

2. **Return CORS Headers Conditionally:**
   ```typescript
   const corsHeaders = {
     "Access-Control-Allow-Origin": isAllowed ? origin : "",
     "Access-Control-Allow-Headers": "authorization, content-type",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Max-Age": "86400",
   };
   ```

3. **Handle Preflight Requests:**
   ```typescript
   if (req.method === "OPTIONS") {
     if (!corsHeaders["Access-Control-Allow-Origin"]) {
       return new Response("CORS policy violation", { status: 403 });
     }
     return new Response("ok", { headers: corsHeaders });
   }
   ```

## Environment Variables Required

```
# CORS Origins (comma-separated)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# For local development, add:
# ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Testing Security Headers

### Using curl:

```bash
# Check all headers
curl -I https://yourdomain.com

# Check specific header
curl -I https://yourdomain.com | grep "Content-Security-Policy"
```

### Using online tools:

- [Security Headers Checker](https://securityheaders.com/)
- [OWASP Headers Checker](https://owasp.org/www-project-secure-headers/)

## Content Security Policy Notes

### Script Sources:
- `'self'` - Only same-origin scripts
- `'unsafe-inline'` - Allows inline scripts (less secure, but may be needed for React)
- External CDNs for third-party libraries

### Style Sources:
- `'self'` - Same-origin styles
- `'unsafe-inline'` - Inline styles (less secure)
- Google Fonts for typography

### Connect Sources:
- Supabase API endpoints
- Stripe API
- Resend API
- Google Analytics

## Recommendations

1. **Regular Audits:** Check security headers monthly using securityheaders.com
2. **CSP Tuning:** Start with `report-uri` for monitoring before enforcing
3. **HTTPS Only:** Ensure all external resources use HTTPS
4. **Testing:** Test headers in development before production deployment

## References

- [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/)
- [MDN Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Content Security Policy Guide](https://content-security-policy.com/)
