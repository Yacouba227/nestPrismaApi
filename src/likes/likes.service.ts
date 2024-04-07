import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async create(createLikeDto: CreateLikeDto,userId: string, postId: string,) {
    // return 'This action adds a new like';
    const likeCreated = await this.prisma.like.create({
      data: {
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
    return {message: 'post liked successfully'};
  }

  findAll() {
    return `This action returns all likes`;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} like`;
    const searchedOneLike = await this.prisma.like.findUnique({
      where: { id },
    });
    if (!searchedOneLike) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return searchedOneLike;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  async remove(id: string) {
    // return `This action removes a #${id} like`;
    await this.findOne(id);
    const likeDeleted = await this.prisma.like.delete({
      where: { id },
    });
    return likeDeleted;
  }
}
