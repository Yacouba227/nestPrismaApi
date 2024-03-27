import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phonne?: string;
}
