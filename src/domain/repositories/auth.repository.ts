import { UserLoginM } from '../model';

export interface AuthRepository {
  login(auth: UserLoginM): Promise<any>; //Login
}
