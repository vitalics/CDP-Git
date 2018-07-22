import { Component } from './abstract.component';

import { Elem } from 'types';
import { element } from 'utils';

export class FormComponent extends Component {
  @element('#employeeId') public employee!: Elem;
  @element('#approverId') public approver!: Elem;
  @element('#draft') public draftButton!: Elem;
}
