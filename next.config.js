/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bujcqiejrfugzhjspmpg.storage.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
