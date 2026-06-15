import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Task 8.1 - Allow external image domains used in project cards (Req 4.2, 4.5)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Enable WebP format for better mobile performance
    formats: ["image/webp", "image/avif"],
    // Optimize device sizes for responsive srcset (Req 4.2)
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
