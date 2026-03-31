import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/aisle-maelys-flywheel" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/aisle-maelys-flywheel/" : "",
};

export default nextConfig;
