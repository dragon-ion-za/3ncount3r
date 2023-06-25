module.exports = {
  name: 'spa-3ncount3r',
  exposes: {
    './Module': './src/remote-exports/entry.remote.ts',
    './menu': './src/remote-exports/menu.remote.ts'
  },
};
