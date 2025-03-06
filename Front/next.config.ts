import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "developers.google.com"], // Agregamos el dominio permitido
  },
};

export default nextConfig;
