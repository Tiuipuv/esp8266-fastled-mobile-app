import packageJson from './package.json' with { type: 'json' };

export default ({ config }) => ({
  ...config,
  version: packageJson.version
});