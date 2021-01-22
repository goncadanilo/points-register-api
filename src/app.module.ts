import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { RegistersModule } from './modules/registers/registers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      playground: true,
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
      entities: [resolve(__dirname, '**', 'entities', '*.entity.{ts,js}')],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    RegistersModule,
  ],
})
export class AppModule {}
