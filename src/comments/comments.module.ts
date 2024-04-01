import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CommentsController],
  providers: [PrismaService, CommentsService, UsersService],
})
export class CommentsModule {}
