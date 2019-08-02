import {isDevMode} from '@angular/core';

export function assumeDefined<T>(value: T | undefined | null, message: string = 'value must be defined') {
  if (value == undefined && isDevMode()) {
    throw Error(message);
  }
}

export function requireDefined<T>(value: T | undefined | null): T {
  if (value == undefined && isDevMode()) {
    throw Error('value must be defined');
  }
  return value as T;
}
