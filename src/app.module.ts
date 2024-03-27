import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    // MongooseModule.forRoot(''),
    UsersModule, 
    PostModule, 
    CommentsModule, 
    LikesModule
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
