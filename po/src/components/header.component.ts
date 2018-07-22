import { component, element } from 'utils';

import { Component } from './abstract.component';
import { ActionDropdownComponent } from './action.dropdown.component';

export class HeaderComponent extends Component {
  @component('.mainnav') public readonly actionDropdown!: ActionDropdownComponent;
}