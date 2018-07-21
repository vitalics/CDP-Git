import { homedir, platform } from 'os';
import { sep } from 'path';
import chromeCapabilities from './chrome/chrome.capabilities';
export function getBrowserStackName() {
    const envName = process.env.BROWSERSTACK_NAME;

    if (envName && envName.trim().length > 0) {
        return envName;
    }
    return `Doodle Web Integrations (${getMachineId()})`;
}

export function getMachineId() {
    const id = homedir().split(sep).pop();
    return `${platform()}-${id}`;
}
// const firefoxCapabilities = require('./firefox/firefox.capabilities');
// const ieCapabilities = require('./ie/ie.capabilities');
// const mobileCapabilities = require('./mobile/mobile.capabilities');

module.exports = [...chromeCapabilities];
