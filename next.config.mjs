/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "jdtugqnwacfcexraxepr.supabase.co",
                pathname: "/storage/v1/object/public/Projects/**",
            },
        ],
    },
};

export default nextConfig;
