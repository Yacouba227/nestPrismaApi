import { MinLength } from "class-validator";

export class CreateCommentDto {
    @MinLength(5, {
        message: 'Please enter at least 5 characters',
    })
    content: string;
}
