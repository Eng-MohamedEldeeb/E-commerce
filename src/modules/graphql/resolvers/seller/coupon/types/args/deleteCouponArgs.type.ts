import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteCouponMutationDTO {
  @Field(() => ID)
  couponId: string;
}
