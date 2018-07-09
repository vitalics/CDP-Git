// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.ts'],
    capabilities: { 'browserName': 'chrome' },
    beforeLaunch: function () {
        require('ts-node').register();
    }
}