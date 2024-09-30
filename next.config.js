module.exports = {
    async redirects() {
    return [
      {
        source: '/',         // When the root path is accessed
        destination: '/getting-started', // Redirect to /getting-started
        permanent: true,     // Set it as a permanent redirect (status code 308)
      },
    ];
  },
    output: 'standalone',
    webpack: (config, { defaultLoaders }) => {
      // Ignore the tools directory
      config.module.rules.push({
        test: /\.ts$/,
        exclude: /tools/,
        use: [defaultLoaders.babel]
      });
      return config;
    }
    
  };
  