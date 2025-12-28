const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dentalitapi.sepasholding.com/api/:path*',
      },
    ];
  },
  images: {
    domains: ['trustseal.enamad.ir', 'dentalitfiles.sepasholding.com'],
  },
};

module.exports = nextConfig;
