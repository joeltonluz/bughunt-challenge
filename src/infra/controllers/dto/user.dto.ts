import {
  IsEmail,
  IsEnum,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserTypeEnum } from 'src/infra/common/enum/user.enum';

export class UserDto {
  @MinLength(5)
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'name must be only letters' })
  name: string;

  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, {
    message:
      'The password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.',
  })
  password: string;

  @IsEnum(UserTypeEnum, {
    message:
      'type must be one of the following values: administrador ou cliente',
  })
  type: string;
}
