import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/posts", permanent: true },
      { source: "/blog/:slug", destination: "/posts/:slug", permanent: true },
    ]
  },
};

export default nextConfig;
