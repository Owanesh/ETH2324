
module.exports = {
  poweredByHeader: false,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*", // automatically handles all locales
        headers: [
          {
            key: "X-Frame-Options",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy-Report-Only",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1, mode=block",
          },
          {
            key: "Expect-CT",
            value: "enforce, max-age=30;",
          },
        ],
      },
    ];
  },
}