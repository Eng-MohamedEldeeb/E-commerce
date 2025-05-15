import { Field, ObjectType } from '@nestjs/graphql';

export interface IFile {
  public_id: string;
  secure_url: string;
}

@ObjectType()
export class OneFileResponse implements IFile {
  @Field(() => String)
  public_id: string;

  @Field(() => String)
  secure_url: string;
}
