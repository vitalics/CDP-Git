import { Component } from './abstract.component';

import { Elem, Elems } from 'types';
import { element, elements } from 'utils';

export class ActionDropdownComponent extends Component {
  @element('.mainnav .dropdown') public readonly dropdown!: Elem;

  @elements('.mainnav .dropdown #required') public readonly dropdownItems!: Elems;
}