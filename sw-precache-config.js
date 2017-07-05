module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.json',
    'dist/assets/images/*',
    'dist/assets/icon/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /learn-compute\.firebaseio\.com/,
    handler: 'networkFirst'
  }]
};
