import { Elem, Elems } from 'types';

export abstract class Component {
    public parent: Elem = browser.$(this.parentSelector);
    public constructor(public parentSelector: string) {
    }

    public $(
        selector: string,
        parent: Elem = this.parent || $('body')
    ): Elem {
        return parent.$(selector);
    }
    public $$(
        selector: string,
        parent: Elem = this.parent || $('body')
    ): Elems {
        return parent.$$(selector);
    }
}
