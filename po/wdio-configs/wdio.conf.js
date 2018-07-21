/* eslint-disable */
require('ts-node').register();
const tsConfig = require('../tsconfig.json');

const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './src'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register();

const path = require('path');

// const doodleConfig = require('../config/doodle.conf');
const defaultCapabilities = require('../capabilities');
const debugCapabilities = require('../capabilities/debug/debug.capabilities');

const DEBUG = process.env.DEBUG === 'true';
const MOBILE = process.env.MOBILE === 'true';
// const PAYPAL = process.env.PAYPAL === 'true';

const TIMEOUT = {
  DEFAULT: process.env.MOBILE ? 360000 : 80000,
  DEBUG: 80000,
};

// You can override this baseUrl with either the `SERVER` env var
// or by editing ./config/doodle.config.js
// const doodleBaseUrl = doodleConfig.baseUrl;

/**
 * Export the final configuration object for WebDriver
 *
 */
exports.config = {
  maxInstances: 1,

  specs: [path.resolve(__dirname, '../src/features/**/*.feature')],

  // These are added temporarily for Matthias to take advantage of
  // tests that are currently not in redesign
  // suites: {
  //   payments: [
  //     '../src/features/premium/payment-private-desktop.feature',
  //     '../src/features/premium/payment-business-desktop.feature',
  //   ],
  //   thirdPartyLogin: [
  //     '../src/features/account/login-facebook-desktop.feature',
  //     '../src/features/account/login-google-desktop.feature',
  //   ],
  //   regressions: ['./src/features/regressions/styleguide-desktop.feature'],
  // },

  plugins: {
    // webdrivercss: {
    //   screenshotRoot: 'screenshots',
    //   failedComparisonsRoot: 'diffs',
    //   misMatchTolerance: 0.05,
    //   screenWidth: [320, 480, 640, 1024]
    // },
  },

  capabilities: DEBUG ? debugCapabilities : MOBILE ? mobileCapabilities : defaultCapabilities,
  sync: true,
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5860'],
  logLevel: DEBUG ? 'error' : 'silent', // silent | verbose | command | data | result | error
  coloredLogs: true,
  deprecationWarnings: false,
  bail: 0,
  screenshotPath: path.resolve(__dirname, '../screenshots/error'),
  baseUrl: 'https://yandex.ru',

  waitforTimeout: DEBUG ? TIMEOUT.DEBUG : TIMEOUT.DEFAULT,
  connectionRetryTimeout: DEBUG ? TIMEOUT.DEBUG : TIMEOUT.DEFAULT,
  connectionRetryCount: 3,
  services: ['selenium-standalone', 'typescript'],
  framework: 'cucumber',
  reporters: ['dot', 'spec', 'json', 'cucumber', 'allure'],
  reporterOptions: {
    outputDir: './reports/',
    filename: 'cucumber-report',

    allure: {
      outputDir: '../allure-results',
      disableWebdriverStepsReporting: true,
      useCucumberStepReporter: true,
    },
  },

  cucumberOpts: {
    require: [
      path.resolve(process.cwd(), './src/step_definitions/index.ts'),
      // path.resolve(process.cwd(), './src/step_definitions/gmail-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/common-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/participation-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/billing-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/premium-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/login-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/account-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/help-page-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/homepage-steps.js'),
      // path.resolve(process.cwd(), './src/step_definitions/dashboard-page-steps.js'),
    ], // <string[]> (file/dir) require files before executing features
    backtrace: true, // <boolean> show full backtrace for errors
    compiler: ['ts:ts-node/register'], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: false, // <boolean> fail if there are any undefined or pending steps
    tags: process.env.TAGS ? [process.env.TAGS] : ['enabled'], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: '',
    tagsInTitle: false,
    timeout: DEBUG ? TIMEOUT.DEBUG : TIMEOUT.DEFAULT, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  onPrepare: function () {
    // const tsConfig = require('../tsconfig.json');
    // require('ts-node').register({ project: './tsconfig.json' });
    // require('tsconfig-paths').register({
    //   baseUrl: tsConfig.baseUrl,
    //   paths: tsConfig.compilerOptions.paths
    // });
  }
  // onPrepare: hooks.onPrepare,
  // before: hooks.before,
  // beforeFeature: hooks.beforeFeature,
  // beforeScenario: hooks.beforeScenario,
  // beforeStep: hooks.beforeStep,
  // beforeCommand: hooks.beforeCommand,
  // afterCommand: hooks.afterCommand,
  // afterStep: hooks.afterStep,
  // afterScenario: hooks.afterScenario,
  // afterFeature: hooks.afterFeature,
  // after: hooks.after,
  // onComplete: hooks.onComplete,
};
