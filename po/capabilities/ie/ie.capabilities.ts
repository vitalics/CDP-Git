import { resolve } from 'path';
import { getBrowserStackName } from '../';

export const windows10IE11 = {
    name: getBrowserStackName(),
    maxInstances: 2,
    os: 'Windows',
    os_version: '10',
    browser: 'IE',
    browser_version: '11.0',
    resolution: '1024x768',
    'browserstack.video': true,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
    mobile: false, // custom option
};

export const windows10Edge14 = {
    name: getBrowserStackName(),
    maxInstances: 2,
    os: 'Windows',
    os_version: '10',
    browser: 'Edge',
    browser_version: '14.0',
    resolution: '1024x768',
    'browserstack.video': true,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
    mobile: false, // custom option
};

export const windows8IE11 = {
    name: getBrowserStackName(),
    maxInstances: 2,
    os: 'Windows',
    os_version: '8.1',
    browser: 'IE',
    browser_version: '11.0',
    resolution: '1024x768',
    'browserstack.video': true,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    exclude: [resolve(__dirname, '../../', './features').concat('/**/*-mobile.feature')],
    mobile: false, // custom option
};
