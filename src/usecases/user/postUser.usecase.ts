import { ILogger } from 'src/domain/logger/logger.interface';
import { UserM } from 'src/domain/model';
import { UserRepository } from 'src/domain/repositories';

export class PostUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: UserM): Promise<UserM> {
    this.logger.log('User Usecase', 'Inserting one user !');
    return await this.userRepository.insert(user);
  }
}
