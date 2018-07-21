import { Component } from 'components';
import { Elem } from 'types';
import { driver, element } from 'utils';

export class SignupPopupComponent extends Component {

    @element('#registerWithEmail')
    public registerWithEmailLink!: Elem;

    @element('#email')
    public emailInput!: Elem;

    @element('#doRegister')
    public registerButton!: Elem;

    @element('#name')
    public doodleAccountNameInput!: Elem;

    @element('#password')
    public doodleAccountPasswordInput!: Elem;

    @element('#createAccount')
    public signUpForDoodleButton!: Elem;

    public signupWithEmail(email: string): void {
        driver.clickTo(this.registerWithEmailLink);
        driver.setValue(this.emailInput, email);
    }
}
