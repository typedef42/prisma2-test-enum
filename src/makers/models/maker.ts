import { IsOptional, Min } from 'class-validator';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType()
export class Maker {
  @Field(type => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  name: string;

  @Field(type => MakerArgs)
  state: MakerArgs;

  // @Field(type => MakerEnumArgs)
  // state: MakerEnumArgs;
}

export enum MakerArgs {
  FOO = 'FOO',
  BAR = 'BAR'
}

registerEnumType(MakerArgs, {
  name: 'MakerArgs',
  description: 'Maker args enum',
});

// export enum MakerEnumArgs {
//   FOO = 'FOO',
//   BAR = 'BAR'
// }

// registerEnumType(MakerEnumArgs, {
//   name: 'MakerEnumArgs',
//   description: 'Maker args enum',
// });