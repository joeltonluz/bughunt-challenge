import {
  IsBoolean,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddBookDto {
  @MinLength(3)
  @MaxLength(60)
  title: string;

  @MinLength(3)
  @MaxLength(60)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'author must be only letters' })
  author: string;

  @IsBoolean({ message: 'available must be a boolean (true/false)' })
  available: boolean;
}

export class PutBookDto extends AddBookDto {
  @IsOptional()
  available: boolean;
}

export class PutAvailableBookDto extends AddBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;
}
