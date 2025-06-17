const { getDefaultConfig } = require('@expo/metro-config');

const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// Add support for importing TypeScript files
config.resolver.sourceExts.push('ts', 'tsx');

// Add support for @ alias
config.resolver.extraNodeModules = {
  '@': `${__dirname}/src`,
};

module.exports = config;