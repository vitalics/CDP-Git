import { getBrowserStackName } from '../';

/**
 * Set the WebDriver Capabilities to use in Debug mode
 *
 */
export const debugCapabilities = [
  {
    name: `(Debug) ${getBrowserStackName}`,
    maxInstances: 1,
    browserName: 'chrome',
    version: '60',
    chromeOptions: {
      args: [
        'disable-impl-side-painting',
        'disable-background-timer-throttling',
        'enable-logging',
        'disable-notifications',
        'disable-infobars',
      ],
    },
  },
];
