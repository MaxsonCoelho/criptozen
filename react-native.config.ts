module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets/fonts/'],
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null, // iOS will use the auto-linking feature
          android: null, // Android will use the auto-linking feature
        },
      },
    },
  };
  