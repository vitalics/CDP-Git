/* eslint global-require: 0, no-unused-vars: 0 object-shorthand: 0 */
// const browserstack = require('browserstack-local');

// const localIdentifier = `localBrowserstack_${Date.now()}`;

/**
 * Close Tabs in the Browser Window
 */
const closeTabs = function () {
  const tabs = browser.getTabIds();

  if (tabs.length > 1) {
    tabs.slice(1, 1).forEach(tab => {
      browser.close(tab);
    });
  }
};

/**
 * Clear Session/Cookie Data from the Browser window
 */
const clearSessionData = function () {
  const url = browser.getUrl();

  if (!url.indexOf('doodle') < 0) {
    browser.url('/');
  }

  if (url.indexOf('data') !== 0) {
    browser.localStorage('DELETE');
    browser.deleteCookie();
  }
};

/**
 * disable alerts in beforeunload callbacks: they trigger an error when navigating to another url without
 * knowing there was such an alert from a previous scenario / feature
 */
const disableAlerts = function () {
  browser.execute('window.onbeforeunload=function(){};');
};


exports = {
  onPrepare: (config, capabilities) => {
    // console.log('ca', capabilities);
    // exports.bsLocal = new browserstack.Local();
    // if (capabilities[0]['browserstack.local'] === 'true') {
    //   return new Promise((resolve, reject) => {
    //     exports.bsLocal.start({ localIdentifier, key: config.key }, error => {
    //       console.log('Connecting local browserstack...');
    //       if (error) reject(error);
    //       resolve();
    //       console.log('browserstack-local is connected (running)');
    //     });
    //   });
    // }
    // return null;
  },

  before: function () {
    // babel-register is already seted up in cucumberOpts in wdio.conf.js
  },

  beforeFeature: function (feature) {
    // Attach a custom command for extracting the page from each browser instance.

  },

  beforeScenario: function (scenario) {
    if (!process.env.MOBILE) {
      // Ensure a clean session is running after a failed scenario
      clearSessionData();
    }
  },

  beforeStep: function (step) { },

  beforeCommand: function (command) { },

  afterCommand: function (command) { },

  afterStep: function (step) { },

  afterScenario: function (scenario) {
    if (!process.env.MOBILE) {
      closeTabs();
      clearSessionData();
      disableAlerts();
    }
  },

  afterFeature: function (feature) {
    if (!process.env.MOBILE) {
      browser.setCookie({ name: 'timeZone', value: 'Europe/Zurich' });
    }
  },

  after: function () { },

  onComplete: function (capabilties, specs) {
    // if (exports.bsLocal.isRunning()) {
    //   exports.bsLocal.stop(() => {
    //     console.log('browserstack-local is disconnected (stopped)');
    //   });
    // }
  },
};
