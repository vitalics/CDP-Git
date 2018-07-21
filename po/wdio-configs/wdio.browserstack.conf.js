const merge = require('deepmerge');
const wdioConf = require('./wdio.conf');
const { BROWSERSTACK } = require('./pageobjects/constants');

const { user, key } = process.env.MOBILE
  ? BROWSERSTACK.MOBILE
  : process.env.PAYPAL ? BROWSERSTACK.PAYPAL : BROWSERSTACK.DESKTOP;

exports.config = merge(wdioConf.config, {
  user,
  key,
  services: ['browserstack'],
  browserstackLocal: process.env.BROWSERSTACK_LOCAL,
});
