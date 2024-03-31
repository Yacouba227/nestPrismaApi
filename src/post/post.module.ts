import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService, UsersService],
})
export class PostModule {}
