const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const { withModuleFederation } = require('@nrwl/react/module-federation');

const baseConfig = require('./module-federation.config');

const config = {
  ...baseConfig,
};

const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@microfrontends/load-remote-module',
]);

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  withNx(),
  withReact(),
  withModuleFederation({
    ...config,
    shared: (libraryName, defaultConfig) => {
      if (coreLibraries.has(libraryName)) {
        return { ...defaultConfig, eager: true };
      }
      return false;
    },
  })
);
