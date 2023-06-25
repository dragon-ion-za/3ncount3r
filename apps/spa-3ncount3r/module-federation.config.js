module.exports = {
  name: 'spa-3ncount3r',
  exposes: {
    './Module': './src/remote-entry.ts',
    './menu': './src/remote-exports/encounters-menu/encounters-menu.ts'
  },
};
