module.exports = {
  name: 'internal-plugin',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
