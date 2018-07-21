import { Elem } from 'types';
import { Client } from 'webdriverio';

import { Milliseconds, TIMEOUTS } from '../../constants';
import { Injectable } from '../ioc';

@Injectable()
export class Driver {
    protected driver: Client<void> = browser;

    public constructor(protected browserInstance?: Client<void>) {
        if (browserInstance) {
            this.driver = browserInstance;
        }
    }

    /**
     * scroll to element location
     * @param element scroll browser to choosen element
     */
    public scrollTo(element: Elem): void {
        element.waitForExist(TIMEOUTS.VISIBILITY);
        this.driver.isMobile ?
            this.driver.swipe(element.selector, 0, 0, 100) :
            this.driver.scroll(element.selector);
    }

    /**
     * click to element and wait after action
     * @param element web element
     * @param timeoutAfterClick
     */
    public clickTo(element: Elem, timeoutAfterClick?: number): void {
        this.scrollTo(element);
        element.waitForVisible(TIMEOUTS.VISIBILITY);
        element.waitForEnabled(TIMEOUTS.VISIBILITY);
        element.click();
        if (timeoutAfterClick) {
            this.driver.pause(timeoutAfterClick);
        }
    }

    /**
     * setting value to element
     * @param element web element
     * @param value value witch will choose
     */
    public setValue(element: Elem, value: string | number | string[]): void {
        this.scrollTo(element);
        browser.pause(Milliseconds._1000);
        element.waitForValue(TIMEOUTS.WAIT_FOR_VISIBLE);
        element.click();
        element.clearElement();
        element.setValue(value);
        if (this.driver.isMobile) {
            this.driver.hideDeviceKeyboard('pressKey');
        }
    }

    /**
     * choose value in dropdown
     * @param element
     * @param value value witch will be choosen
     */
    public dropdownSelect(element: Elem, value: string): void {
        this.clickTo(element);
        element.selectByValue(value);
    }

    /**
     * get to know is change url after click by element
     * @param element
     */
    public urlChangedAfterClick(element: Elem): boolean {
        const currentUrl = this.driver.getUrl();
        this.clickTo(element);
        return this.driver.waitUntil(() => {
            const url = this.driver.getUrl();
            return url !== currentUrl;
        });
    }

    /**
     * continue executing after waiting timeout
     * @param timeout waiting in milliseconds units
     */
    public wait(timeout: number = TIMEOUTS.VISIBILITY): void {
        browser.pause(timeout);
    }
}

/**
 * Driver instance, you can create own Driver
 * @example
 * ```
 * ``` typescript
 * 
 * const mySuperDriver = new Driver(myOwnBrowser);
 * mySuperDriver.clickTo(findedElement)
 *
 * ```
 */
export const driver = new Driver(browser);
