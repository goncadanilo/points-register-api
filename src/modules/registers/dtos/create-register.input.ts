import { InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRegisterInput {
  @IsNotEmpty({ message: 'User id is required' })
  userId: string;

  @IsDate({ message: 'Time registered is invalid' })
  @IsNotEmpty({ message: 'Time registered is required' })
  timeRegistered: Date;
}
