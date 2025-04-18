import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora errores de ESLint en producción
  },
  images: {
    domains: [
      "randomuser.me",
      "developers.google.com",
      "t4.ftcdn.net",
      "images.vexels.com", // ❗️ Quité el "https://" porque solo debe ir el dominio
      "lh3.googleusercontent.com",
      "static.vecteezy.com"
    ],
  },
};

export default nextConfig;
