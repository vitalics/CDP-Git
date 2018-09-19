import { expect } from 'chai';
import { browser } from 'protractor';

import { binding, given, then } from 'cucumber-tsflow';
import { HomePage } from '../pages/home.page';
import { Logger } from '../utils/logger/logger';

@binding()
class Temp {
    private home: HomePage = new HomePage('https://epam.com');
    public constructor() {
        this.home.open();
    }

    @given(/^User open "home" page$/)
    public async someMethod(): Promise<void> {
        expect(await browser.getTitle()).equal('EPAM | Software Product Development Services');
    }

    @given(/^User click by "([^"]*)" text button$/)
    public async clickByMenuItem(menuItemName: string): Promise<void> {
        const items = this.home.header.$$('.top-navigation__row .top-navigation__item');
        const texts = Promise.all([items.map((i) => i.$('.top-navigation__item-link').getText())]);
        console.dir(texts);
    }

    @then(/^Route change by "([^"]*)" routing$/)
    public async isRouteChanged(routing: string): Promise<void> {
        const current = await browser.getCurrentUrl();

        expect(current).equals(routing);
    }
}
