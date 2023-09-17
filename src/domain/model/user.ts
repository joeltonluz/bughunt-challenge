export class UserWithoutPasswordM {
  id?: string;
  name: string;
  email: string;
  password: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserM extends UserWithoutPasswordM {
  password: string;
}
