import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}
