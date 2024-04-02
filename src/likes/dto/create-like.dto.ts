import { MinLength } from "class-validator";

export class CreateLikeDto {
    @MinLength(5, {
        message: 'Please enter at least 5 characters',
    })
    title: string;
}
