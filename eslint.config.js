const angular = require('angular-eslint');

module.exports = [
  ...angular.configs.tsRecommended.map((config) => ({
    ...config,
    files: ['src/**/*.ts'],
  })),
  ...angular.configs.templateRecommended.map((config) => ({
    ...config,
    files: ['src/**/*.html'],
  })),
];
