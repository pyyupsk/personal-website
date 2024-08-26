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
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                port: "",
                pathname: "/api/**",
            },
        ],
    },
};

export default nextConfig;
