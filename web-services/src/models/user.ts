export const EmailRegex = /(?: [a - z0 - 9!#$ %& '*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +\=?^ _`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;

export interface User {
  id: number;
  name: string;
  username: string;
  email: string | RegExp;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type Users = User[];

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geolocation;
}

interface Geolocation {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

