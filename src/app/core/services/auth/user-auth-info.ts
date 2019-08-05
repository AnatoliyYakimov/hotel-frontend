import {TokenPair} from './token-pair';

export interface UserAuthInfo {
  id: number;
  login: string;
  authority: string;
  tokens: TokenPair;
}
