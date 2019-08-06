import {Moment} from 'moment';

export interface User {
  id: number;
  login: string;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  birthDate: Moment;
  authority: string;
}
