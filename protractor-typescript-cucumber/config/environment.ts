export let environment = {
    // Capabilities to be passed to the webdriver instance.
    baseUrl:
        'http://' + (process.env.HTTP_HOST || 'localhost') +
        ':' + (process.env.HTTP_PORT),

    capabilities: {
        browserName: (process.env.TEST_BROWSER_NAME || 'chrome'),
        version: (process.env.TEST_BROWSER_VERSION || 'ANY'),
    },

    // Protractor interactive tests
    interactiveTestPort: 6969,

    // A base URL for your application under test.
    // Default http port to host the web server
};