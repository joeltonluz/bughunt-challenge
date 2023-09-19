import { Connection } from 'mongoose';
import { BookSchema } from '../schemas/book.schema';
import { UserSchema } from '../schemas/user.schema';

export const ConnectionsProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Book', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('USer', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
