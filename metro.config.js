const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for importing TypeScript files
config.resolver.sourceExts.push('ts', 'tsx');

// Add support for @ alias
config.resolver.extraNodeModules = {
  '@': `${__dirname}/src`,
};

module.exports = config;
