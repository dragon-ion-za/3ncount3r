module.exports = {
  name: 'shell',
  remotes: [],
  shared: (libname, config) => { config.singleton = true; config.eager = true; return config; },
};
