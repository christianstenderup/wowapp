/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true,
    // ESLint Configuration
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      // Run ESLint on these directories during the build process
      dirs: ['app', 'components', 'layouts', 'scripts'],
      // Ensure ESLint runs in development and fails the build on errors
      ignoreDuringBuilds: false,
    },
    // Additional Next.js configurations can be added here
    webpack(config) {
      Object.defineProperty(config, 'devtool', {
        get() {
          return 'source-map';
        },
        set() {},
      });
      return config;
    },};

export default nextConfig;
