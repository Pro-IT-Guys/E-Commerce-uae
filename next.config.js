const withTM = require('next-transpile-modules')(['react-apexcharts'])

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Disable HMR for both client and server builds
    if (!isServer) {
      config.resolve.alias['@next/react-dev-overlay'] = 'node-noop'
    }

    return config
  },
  images: {
    domains: ['localhost', 'server.aymifashion.com', 'i.ibb.co'],
  },
})
