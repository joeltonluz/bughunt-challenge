import { UserM, UserWithoutPasswordM } from '../model';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
}
