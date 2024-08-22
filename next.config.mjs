/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "geon6kvypdtg3nc1.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default nextConfig;
