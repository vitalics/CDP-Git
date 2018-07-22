import { FormComponent, HeaderComponent } from 'components';
import { component } from 'utils';

import { Page } from '../abstract.page';

export class VacPage extends Page {
  @component('') public header!: HeaderComponent;
  @component('#request-form') public form!: FormComponent;
}