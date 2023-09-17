import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof PrismaClient>;
type Keys<T extends Entity> = Extract<
  keyof (typeof PrismaClient)[keyof Pick<
    typeof PrismaClient,
    `${T}ScalarFieldEnum`
  >],
  string
>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in PrismaClient[`${type}ScalarFieldEnum`]) {
      if (!omit.includes(key as K)) {
        result[key as Key] = true;
      }
    }
    return result;
  }
}
