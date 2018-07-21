# Web Integration Tests

> For Doodle!

In an effort to stabilize flaky tests written for WebdriverIO v3.3 (which is promise-based), a rewrite of the test suites using version `4+`
of WebdriverIO is needed for synchronous testing support.

## Road Map

 - [x] Use WebdriverIO new synchronous model for better readability/maintainability and less "flakiness"
 - [ ] Integration tests should cover all features `doodle/redesign`
 - [x] Step definitions should be reusable and more high-level than single clicks
 - [x] Should follow [best cucumber practices](https://blog.codeship.com/cucumber-best-practices/) 
 - [ ] When ported to `beta/redesign`, where is the implementation is different: feature definition should change less or not at all, whereas the step definition itself is adapted.
 - [ ] When ported to `beta/redesign`, where the implementation is not yet implemented: replace step definition with a 'pending' implementation
 - [ ] Visual Regression should be as automatic as possible
 - [ ] Parallel-ized runs

## BrowserStack

> :bulb: If you are running the Integration Tests for a production release, or wanting to run all of the tests that are marked as `@stable`, then use the [scripts that target the `@stable` tag](https://github.com/DoodleScheduling/web-integration-tests#run-specific-tags)
## Run your local tests on BrowserStack

You can run the Integration Tests via BrowserStack, but still get logging, and reporting locally in your terminal with any of these script samples:

```
test:features:local:browserstack
test:features:local:browserstack -- --spec=./features/path/to/file.feature
test:features:local:browserstack -- --cucumberOpts.tagExpression=@stable
```

## Run Integration Tests against current staging via BrowserStack

 ```
test:features:browserstack
test:features:browserstack -- --spec=./features/path/to/file.feature
test:features:browserstack -- --cucumberOpts.tagExpression=@stable
```

:bulb: All of the BrowserStack scripts let you mix-and-match all the different enviornment variable options found in this document below, like [setting the server to point to](#setting-the-server), [running specific tags](#run-specific-tags), or [running a specific feature file](#run-a-specific-feature-file).

:bulb: **Unique Titles:** All Integration Tests run on Browserstack will get tagged with a _mostly_ unique id that includes (for now) the source host's platform and home directory name. So, for example, if you ran the integration tests on macOS, and your home directory is named `mw`, then all of your tests in Browserstack will be titled `Doodle Web Integration (darwin-mw)`. This helps you identify which tests are yours in the cluttered Browserstack interface.

:bulb: **Customizing Unique Titles:** You can override the default unique title by passing in the `BROWSERSTACK_NAME` enviornment variable.

# To Run the Third-Party Login and Credit Card Tests 

This is just a temporary guide for running certain Integration Tests that are not
currently supported on the _redesign_ branch, but are supported here in this project.

After you have cloned this repo and run `$ npm install`, you can run the **Credit Card Payment**, **PayPal Payments** and the **Third-party Login/Logout 
Tests** (Facebook and Google) with the following:

> :bulb: **Note that there is no need to manually start the selenium server** (although you can if you want to), if Selenium is not running
then it will be launched automatically. If Selenium is already running, then wdio will just attach to the existing server.

```
$ npm run test:features -- -- --suite=thirdPartyLogin,payments
```

# Setting the Server 

The default server of `https://redesign.doodle-test.com` can be changed to any server you want by using the `SERVER` environment variable. 
You can set your own custom value, or use a predefined alias.

**To set a custom value:**

```bash
SERVER=beta.doodle.local:8444 npm run test
```

Or **to use a predefined alias**:

```bash
SERVER=dev npm run test
```

Where the alias can be one of these values:

| alias | value |
| ------ | ----------- |
| `dev` | `https://doodle.local:8443` | 
| `prod` | `https://doodle.com` | 
| `staging` | `https://redesign.doodle-test.com` |

For more advanced control, you can modify the values in `config/doodle.conf.js`


# Structure

All features files are written in Gherkin, a DSL for cucumber.js which is close to plain text.
Each feature file contains multiple scenarios testing that specific feature.
Feature files must end in either `-desktop.feature` or `-mobile.feature` for targeting the right browsers.

All steps are linked using Regex patterns. Look in the [`src/step_definitions/`](https://github.com/DoodleScheduling/web-integration-tests/tree/master/src/step_definitions) directory to see all of the step_definitions for each page object.


# Run All Feature Tests

```
$ npm run test:features
```

# Run Specific Tags

You can selectively pass in one or more Cucumber tags *via the `TAGS` environment variable*:

```
$ TAGS=@stable npm run test:features
$ TAGS=@one,@two npm run test:features
```

Or you can run tag expression using the *`--cucumberOpts.tagExpression` option* https://docs.cucumber.io/tag-expressions/:

```
$ npm run test:features -- -- --cucumberOpts.tagExpression=@stable
```

# Run a Specific Feature File

Only run one feature file:

```
$ npm run test:features -- -- --spec=./features/path/to/file.feature 
```

Only run one feature file, optionally filtered by tags:

```$
$ npm run test:features -- -- --spec=./features/path/to/file.feature --cucumberOpts.tags=@my-tag
```

# Run Mobile Tests

You can run all mobile scenarios using tag expression `--cucumberOpts.tagExpression=@stable-mobile`
```
$ npm run test:features:mobile -- --cucumberOpts.tagExpression=@stable-mobile
```

Or you can run a Specific Mobile scenario. Note that mobile scenarios must end in `-mobile.feature`
```
$ npm run test:features:mobile -- --spec=./features/path/to/file.feature 
```

# Pending (Undefined) Steps

Any step that is not defined is treated as a `pending` implementation. Pending steps
are a handy way to keep track of features or steps that are waiting to be implemented.

If you want to explicitly (or conditionally) return the `pending` status in a Step Definition, you
can follow this example below, otherwise, simply writing a step in a .feature file that does
not coorespond to a step definition will automatically be marked as pending.

```js
this.When(/^something unspecified happens$/, function () {
    return 'pending';
});
```

# Visual Regression Service (VRS)

:warning: **THIS IS STILL A WORK IN PROGRESS.** _THERE BE DRAGONS!_ :dragon:

We are using [The Visual Regression Service for WebdriverIO](http://webdriver.io/guide/services/visual-regression.html)
to automatically test for Visual Regressions. For now, the only Visual Regression assertions are made on the Styleguide. 

## To Check for Styleguide Regressions

The command below will check for Visual Regressions on the Styleguide. If the test fails, then you will need to check the 
diff files located in `screenshots/diff/` that begin with `styleguide_document_*`, then inspect the diff (the pink parts of the
diff image show the _old and new_ for comparison).  

```bash
$ npm run test:regressions:styleguide 
``` 


## To Run the Visual Regression Tests

> :warning: These are not yet implemented

```
$ npm run test:regressions
```

## Visual Regression Screenshot Locations

Currently, the screenshot images are saved in the following locations:

- **screenshots/screen**: Used only to keep screenshots
- **screenshots/reference**: Used only to keep the reference screenshots for local comparision
- **screenshots/error**: Used to save WebdriverIO's screenshots taken when an error occurs
- **screenshots/diff**: Used to save the diff files used for local comparision

## Visual Regression Filenames

We are currently using the following convention to name all of the screenshot and diff files: 

```
<testName>_<type>_<browserName>_v<browserVersion>_<browserWidth>.png
```

Knowing the filename convention will help you locate specific screenshots for your review,
so here is a reference for each filename component value:

| Value | Description | Examples |
| ------ | ----------- | ---- |
| `testName` | The url endpoint of the page where the screenshot was taken | `premium`, `account#advanced` |
| `type` | The entity type contained in the screenshot | `viewport`, `element` |
| `browserName` | The browser used to take the screenshot | `chrome`, `firefox` |
| `browserVersion` | The version of the browser used to take the screenshot | `v60` |
| `browserWidth` | The width of the browser when the screenshot was taken | `320`, `884` |

