import { IsEnum, Matches, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @MinLength(5)
  @MaxLength(100)
  @Matches(/^[a-zA-Z]+$/, { message: 'author must be only letters' })
  name: string;

  @MinLength(5)
  @MaxLength(100)
  email: string;

  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/, {
    message:
      'password must have one letter masiculua, one letter minuscula, 1 number and one symbol',
  })
  password: string;

  @IsEnum(['administrador', 'cliente'])
  type: string;
}
