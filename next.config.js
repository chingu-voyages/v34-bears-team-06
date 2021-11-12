module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/resident',
        permanent: true,
      },
    ]
  },
}
