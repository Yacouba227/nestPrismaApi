import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma.service';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    postId: string,
  ) {
    const { content } = createCommentDto;
    const commentCreated = await this.prisma.comments.create({
      data: {
        content: content,
        createBy: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    return commentCreated;
    // return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  async findOne(id: string) {
    const searchOneComment = await this.prisma.comments.findUnique({
      where: { id },
    });
    if (!searchOneComment) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return searchOneComment;
    // return `This action returns a #${id} comment`;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    userId: string,
    postId: string,
  ) {
    const { content } = updateCommentDto;
    // await this.usersService.findOne(userId);
    const comments = id && (await this.findOne(id));
    const postUpdated = await this.prisma.comments.update({
      where: { id },
      data: {
        content: content ? content : comments.content,
        createBy: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    return postUpdated;
    // return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    await this.findOne(id);
    const commentDeleted = await this.prisma.comments.delete({
      where: { id },
    });
    return commentDeleted;
    // return `This action removes a #${id} comment`;
  }
}
