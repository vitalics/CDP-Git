import { resolve } from 'path';
import { getBrowserStackName } from '../';

// const ios = {
//  maxInstances: 1,
//  name: getBrowserStackName(),
//  browserName: 'iPhone',
//  platform: 'MAC',
//  device: 'iPhone 5',
//  'browserstack.debug': true,
//  exclude: [
//   path.resolve(__dirname, '../../', './features').concat('/**/*-desktop.feature'),
//   path.resolve(__dirname, '../../', './features/create/timeZone.feature'),
//   path.resolve(__dirname, '../../', './features/create/wizard-timezones.feature'),
//   path.resolve(__dirname, '../../', './features/home/doodle-homepage.feature'),
//   path.resolve(__dirname, '../../', './features/participate/hidden-poll.feature'),
//   path.resolve(__dirname, '../../', './features/gmail-integration.feature'),
//  ],
// };

const android = {
  maxInstances: 1,
  name: getBrowserStackName,
  browserName: 'android',
  platform: 'ANDROID',
  os_version: '7.0',
  device: 'Samsung Galaxy S8',
  real_mobile: 'true',
  'browserstack.local': 'false',
  'browserstack.timezone': 'Europe/Zurich',
  'browserstack.appium_version': '1.6.5',
  exclude: [
    resolve(__dirname, '../../', './features').concat('/**/*-desktop.feature'),
    resolve(__dirname, '../../', './features/create/timeZone.feature'),
    resolve(__dirname, '../../', './features/create/wizard-timezones.feature'),
    resolve(__dirname, '../../', './features/home/doodle-homepage.feature'),
    resolve(__dirname, '../../', './features/participate/hidden-poll.feature'),
    resolve(__dirname, '../../', './features/gmail-integration.feature'),
  ],
};

module.exports = [android]; // Temporarily removed IOS configuration
