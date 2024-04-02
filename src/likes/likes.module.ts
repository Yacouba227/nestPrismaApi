import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [
    LikesController,
  ],
  providers: [PrismaService, UsersService, LikesService],
})
export class LikesModule {}
