import { MaxLength, MinLength, isString } from "class-validator";

export class CreateUserDto {
    @MinLength(5, {
        // here, $constraint1 will be replaced with "5", and $value with actual supplied value
        message: 'firstName is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    firstName: string;
    @MinLength(5, {
        // here, $constraint1 will be replaced with "5", and $value with actual supplied value
        message: 'email is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    email: string;
    @MinLength(5, {
        // here, $constraint1 will be replaced with "5", and $value with actual supplied value
        message: 'phonne is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    phonne: string;
    @MinLength(5, {
        // here, $constraint1 will be replaced with "5", and $value with actual supplied value
        message: 'lastName is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    lastName: string;
}
