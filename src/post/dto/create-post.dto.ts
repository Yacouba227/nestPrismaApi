import { MinLength } from "class-validator";

export class CreatePostDto {
    @MinLength(10, {
        message: 'firstName is too short. Minimal length is $constraint1 characters, but actual is $value',
    })
    title: string;
    @MinLength(30, {
        message: 'firstName is too short. Minimal length is $constraint1 characters, but actual is $value',
    })
    content: string;
}
