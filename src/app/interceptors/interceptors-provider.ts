import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ContentTypeJsonInterceptor} from './content-type-json-interceptor';
import {SimpleLogInterceptor} from './simple-log-interceptor';

export const InterceptorsProvider: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ContentTypeJsonInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SimpleLogInterceptor,
    multi: true
  }
];
