import { Platform } from 'react-native';

// For web, we use the Vite entry point
if (Platform.OS === 'web') {
  module.exports = require('./src/App').default;
} else {
  // For mobile, we use a simpler version without browser-specific components
  const App = () => {
    return null; // TODO: Implement mobile-specific UI
  };
  module.exports = App;
}
