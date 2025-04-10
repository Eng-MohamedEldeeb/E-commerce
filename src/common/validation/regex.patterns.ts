export const phoneRegEx: RegExp = new RegExp(/^01(0|1|2|5)\d{8}$/);

export const userNameRegEx: RegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z]?)(?=.*[0-9]?)(?=[@_]{0,2})(?!.*!#$%&*()-+=\/\\\."';:|,<>\{\}\[\]).{3,16}$/,
);

export const passwordRegEx: RegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z]?)(?=.*[0-9]?)(?!.*!#$%&*()-+=\/\\\."';:|,<>\{\}\[\]).{3,16}$/,
);

export const emailRegEx: RegExp = new RegExp(
  /^\w+@(gmail|yahoo|outlook)(\.com|\.net|\.edu|\.org){1,3}$/,
);
