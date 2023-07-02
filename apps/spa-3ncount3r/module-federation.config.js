module.exports = {
  name: 'spa-3ncount3r',
  exposes: {
    './spa-3ncount3r-app': './src/remote-exports/entry.remote.tsx',
    './spa-3ncount3r-menu': './src/remote-exports/menu.remote.tsx'
  },
};
