import { resolve } from 'path';
import { getBrowserStackName } from '../';

/**
 * Set the Default Capabilities for WebDriver in Firefox
 *
 */
const macOs = {
    name: getBrowserStackName,
    maxInstances: 2,
    os: 'OS X',
    os_version: 'Sierra',
    browser: 'Firefox',
    browser_version: '55.0',
    resolution: '1024x768',
    'browserstack.video': true,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    chromeOptions: {
        args: [
            'disable-background-timer-throttling',
            'disable-impl-side-painting',
            'enable-logging',
            'disable-notifications',
            'disable-extensions',
            'disable-infobars',
        ],
    },
    exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
    mobile: false, // custom option
};

const windows = {
    name: getBrowserStackName,
    maxInstances: 2,
    os: 'Windows',
    os_version: '8',
    browser: 'Firefox',
    browser_version: '55.0',
    resolution: '1024x768',
    'browserstack.video': true,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    chromeOptions: {
        args: [
            'disable-background-timer-throttling',
            'disable-impl-side-painting',
            'enable-logging',
            'disable-notifications',
            'disable-extensions',
            'disable-infobars',
        ],
    },
    exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
    mobile: false, // custom option
};

module.exports = [macOs, windows];
