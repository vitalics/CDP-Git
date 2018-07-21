import { Component } from 'components';
import { Elem } from 'types';
import { driver } from 'utils';

/**
 * Header component. Part of Home page
 * @page [[HomePage]]
 * 
 * <img src='../media/component/header.jpg' alt='Header component' />
 */
export class HeaderComponent extends Component {
    public get signUpButton(): Elem {
        driver.wait(500);
        return browser.$('.d-compactHeader').getCssProperty('display').value === 'none'
            ? browser.$('.d-fullHeader .d-button.d-signup')
            : browser.$('.d-dropdown .d-button.d-signup');
    }
}
