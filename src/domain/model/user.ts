export class UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
