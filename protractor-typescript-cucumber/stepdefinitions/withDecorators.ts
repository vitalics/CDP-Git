import { expect } from 'chai';
import { browser } from 'protractor';

import { binding, given, then } from 'cucumber-tsflow';
import { HomePage } from '../pages/home.page';

@binding()
class Temp {
    private home: HomePage = new HomePage('https://epam.com');
    public constructor() {
        this.home.open();
    }

    @given(/^User open home page$/)
    public async someMethod(): Promise<void> {
        expect(await browser.getTitle()).equal('EPAM | Software Product Development Services');
    }

    @given(/^User click by "([^"]*)"$/)
    public async clickByMenuItem(menuItemName: string): Promise<void> {
        const items = this.home.header.items;
        const texts = await Promise.all(items.map((i) => i.info.getText()));

        const itemIndex = texts.findIndex((t) => t === menuItemName);

        if (itemIndex >= 0) {
            await items[itemIndex].info.click();
        }
    }

    @then(/^Route change by "([^"]*)"$/)
    public async isRouteChanged(routing: string): Promise<void> {
        const current = await browser.getCurrentUrl();

        expect(current).equals(routing);
    }
}
