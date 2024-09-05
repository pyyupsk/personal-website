import BundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = BundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'geon6kvypdtg3nc1.public.blob.vercel-storage.com',
                protocol: 'https',
            },
            {
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/**',
                protocol: 'https',
            },
            {
                hostname: 'ui-avatars.com',
                pathname: '/api/**',
                protocol: 'https',
            },
            {
                hostname: 'api.lanyard.rest',
                protocol: 'https',
            },
            {
                hostname: 'i.scdn.co',
                pathname: '/image/**',
                protocol: 'https',
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default withBundleAnalyzer(nextConfig);
