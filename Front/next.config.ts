import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "developers.google.com", "t4.ftcdn.net", "https://images.vexels.com"], // Agregamos el dominio permitido
  },
};

export default nextConfig;
