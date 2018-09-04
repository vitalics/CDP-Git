export enum HttpStatusCode {
  OK = 200,
  NOTFOUND = 404,
}

export type HttpHeaders = {
  [key: string]: any;
  Accept: string;
  Origin: string;
  'content-type': ContentTypes | string;
}

export enum ContentTypes {
  JSON = 'application/json',
  JSON_UTF8 = 'application/json; charset=utf-8',
  ATOMXML = 'application/atom+xml',
  BASE64 = 'application/base64',
  JAVASCRIPT = 'application/javascript',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  HTML = 'text/html',
  CSS = 'text/css',
  PLAIN = 'text/plain',
}