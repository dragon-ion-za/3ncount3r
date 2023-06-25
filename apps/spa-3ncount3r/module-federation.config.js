module.exports = {
  name: 'spa-3ncount3r',
  exposes: {
    './Module': './src/remote-exports/remote-entry.ts',
    './menu': './src/remote-exports/remote-menu.ts'
  },
};
