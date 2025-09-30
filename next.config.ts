/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipMiddlewareUrlNormalize: true,
  // output: "export",
  images: {
    unoptimized: true,
    domains: ["noreplyxyz.esycles.com"],
  },
};

module.exports = nextConfig;
