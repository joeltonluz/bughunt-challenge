import {
  IsEmail,
  IsEnum,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @MinLength(5)
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'author must be only letters' })
  name: string;

  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  email: string;

  // @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, {
    message:
      'The password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.',
  })
  // @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/, {
  //   message:
  //     'password must have one letter maiúscula, one letter minuscula, 1 number and one symbol',
  // })
  password: string;

  @IsEnum(['administrador', 'cliente'])
  type: string;
}
