import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMatchedWithConstrain', async: false })
class IsMatchedWithConstrain implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    /**
     * {
  args: {
    targetName: 'SignupDTO',
    property: 'confirmPassword',
    object: SignupDTO {
      fullName: 'mohamed mahmoud',
      username: 'ZSvber',
      email: 'zsvber@gmail.com',
      phone: '01288873997',
      password: 'Mohamed@123',
      confirmPassword: 'Mohamed@123',
      birthDate: undefined
    },
    value: 'Mohamed@123',
    constraints: [ 'password' ]
  },
  value: 'Mohamed@123'
}
     * */

    return args.object[args.constraints[0] as string] == value;
  }
  defaultMessage(args: ValidationArguments): string {
    return `${args.object[args.constraints[0] as string]} Doesn't match  ${args.object[args.property]}`;
  }
}

export function IsMatchedWith(
  matchWith: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMatchedWith',
      target: object.constructor, // the Object that used in this custom decorator.
      propertyName: propertyName, // the property with the custom decorator declared on.
      constraints: [matchWith], // the properties given.
      options: validationOptions,
      validator: IsMatchedWithConstrain,
    });
  };
}
