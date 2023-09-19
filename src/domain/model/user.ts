export class UserWithoutPasswordM {
  _id?: string;
  name: string;
  email: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserM extends UserWithoutPasswordM {
  password: string;
}

export class UserLoginM {
  email: string;
  password: string;
}
