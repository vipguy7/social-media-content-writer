import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://d63159962eab6d20473ac8f46d2d2356@o4509514508926976.ingest.de.sentry.io/4509514521247824',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

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
