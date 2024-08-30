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
                port: '',
                protocol: 'https',
            },
            {
                hostname: 'ui-avatars.com',
                pathname: '/api/**',
                port: '',
                protocol: 'https',
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default withBundleAnalyzer(nextConfig);
