export interface ICouponInputs {
  percent_off: number;
  duration: string;
  name: string;
}
export interface ICoupon extends ICouponInputs {
  couponId: string;
}
