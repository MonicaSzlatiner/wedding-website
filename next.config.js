/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external images if needed
  images: {
    remotePatterns: [],
  },
  // Polling avoids EMFILE ("too many open files") from native file watchers on macOS,
  // which can otherwise break dev HMR and surface bogus 404s.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
