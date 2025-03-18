import runtimeCaching from "next-pwa/cache.js";
import withPWA from "next-pwa";



const pwaConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching : [
      {
        urlPattern: /^https:\/\/res\.cloudinary\.com\/.*$/,
        handler: "CacheFirst",
        options: {
            cacheName: "cloudinary-images",
            expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
        },
    },
    ],
    disable : process.env.NODE_ENV !== 'development',
    buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = pwaConfig({
  reactStrictMode: true, // Next.js-specific configuration
  images: {
    // remotePatterns: [
    //   { protocol: "https", hostname: "res.cloudinary.com" },
    //   { protocol: "https", hostname: "f005.backblazeb2.com" },
    //   { protocol: "https", hostname: "lh3.googleusercontent.com" },
    //   { protocol: "https", hostname: "images.unsplash.com" },
    //   { protocol: "https", hostname: "pbs.twimg.com" },
    //   { protocol: "https", hostname: "placehold.co" },
    // ],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      
    ],
  },
});

export default nextConfig;
