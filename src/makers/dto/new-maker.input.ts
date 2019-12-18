import { IsOptional, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

import { MakerArgs } from '../models/maker';
// import { MakerEnumArgs } from '../models/maker';

@InputType()
export class NewMakerInput {
  @Field()
  name: string;

  @Field(type => MakerArgs)
  state: MakerArgs;

  // @Field(type => MakerEnumArgs)
  // state: MakerEnumArgs;
}
