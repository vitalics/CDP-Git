import { resolve } from 'path';
import { getBrowserStackName } from '../';

/**
 * Set the Default Capabilities for WebDriver in Chrome
 *
 */
const macOs = {
  name: getBrowserStackName,
  maxInstances: 2,
  browser: 'Chrome',
  os: 'OS X',
  os_version: 'Sierra',
  browser_version: '64.0',
  resolution: '1024x768',
  'browserstack.video': true,
  'browserstack.local': process.env.BROWSERSTACK_LOCAL,
  'browserstack.timezone': 'Europe/Zurich',
  chromeOptions: {
    args: [
      'start-maximized',
      'disable-background-timer-throttling',
      'disable-impl-side-painting',
      'enable-logging',
      'disable-notifications',
      'disable-extensions',
      'disable-infobars',
    ],
  },
  exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
  "mobile": false, // custom option
};

// eslint-disable-next-line no-unused-vars
const windows = {
  "name": getBrowserStackName,
  "os": 'Windows',
  "os_version": '8',
  "browser": 'Chrome',
  "browser_version": '64.0',
  "resolution": '1024x768',
  'browserstack.video': true,
  'browserstack.local': process.env.BROWSERSTACK_LOCAL,
  'browserstack.timezone': 'Europe/Zurich',
  "chromeOptions": {
    args: [
      'start-maximized',
      'disable-background-timer-throttling',
      'disable-impl-side-painting',
      'enable-logging',
      'disable-notifications',
      'disable-extensions',
      'disable-infobars',
    ],
  },
  "exclude": [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
  "mobile": false, // custom option
};

// eslint-disable-next-line no-unused-vars
const androidEmulation = {
  browser: 'Chrome',
  chromeOptions: {
    args: ['disable-background-timer-throttling'],
    mobileEmulation: {
      deviceName: 'Google Nexus 5',
    },

    exclude: [
      resolve(__dirname, '../../', './src/features').concat('/**/*-desktop.feature'),
      resolve(__dirname, '../../', './src/features/gmail-integration.feature'),
    ],
    maxInstances: 1,
    name: getBrowserStackName,
    os: 'OS X',
    os_version: 'Sierra',
  },
  specs: [resolve(__dirname, '../../', './src/features').concat('/**/*-mobile.feature')],
};

export default [macOs];
