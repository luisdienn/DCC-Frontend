import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "developers.google.com", "lh3.googleusercontent.com"], // Agregamos el dominio permitido
  },
};

export default nextConfig;