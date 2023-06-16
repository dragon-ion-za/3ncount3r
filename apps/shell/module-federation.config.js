module.exports = {
  name: 'shell',
  remotes: [],
  additionalShared: [
    { libraryName: '@angular/core', sharedConfig: { singleton: true, eager: true } },
    { libraryName: 'rxjs', sharedConfig: { singleton: true, eager: true } },
    { libraryName: 'rxjs/operators', sharedConfig: { singleton: true, eager: true } },
  ]
};
