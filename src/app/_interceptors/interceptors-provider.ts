import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ContentTypeJsonInterceptor} from './content-type-json-interceptor';


export const INTERCEPTOR_PROVIDER: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ContentTypeJsonInterceptor,
    multi: true
  }
];
