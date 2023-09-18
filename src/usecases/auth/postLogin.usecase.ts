import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM, UserLoginM } from 'src/domain/model';
import { AuthRepository } from 'src/domain/repositories/auth.repository';

export class PostLoginUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(login: UserLoginM): Promise<BookM> {
    this.logger.log('Auth Usecase', 'Login !');
    return await this.authRepository.login(login);
  }
}
