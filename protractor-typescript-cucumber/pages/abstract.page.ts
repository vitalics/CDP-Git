import { browser } from 'protractor';

export abstract class Page {
    public constructor(public url?: string) { }

    public async open(url?: string): Promise<void> {
        await browser.get(url || this.url || '');
    }
}