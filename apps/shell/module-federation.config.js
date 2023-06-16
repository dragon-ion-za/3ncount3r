module.exports = {
  name: 'shell',
  remotes: [],
  additionalShared: [
    { libraryName: '@angular/core', sharedConfig: { singleton: true, eager: true } },
    { libraryName: '@angular/common', sharedConfig: { singleton: true, eager: true } },
    { libraryName: '@angular/common/http', sharedConfig: { singleton: true, eager: true } },
    { libraryName: '@angular/router', sharedConfig: { singleton: true, eager: true } },
    { libraryName: '@angular/forms', sharedConfig: { singleton: true, eager: true } },
  ]
};
