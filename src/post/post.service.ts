import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
    ){}
  async create(createPostDto: CreatePostDto, userId: string) {
    const {title, content} = createPostDto;
    const user = await this.usersService.findOne(userId)
    // if(!user.firstName){
    //   throw new UnauthorizedException('User not foud')
    // }
    // const { userId } = CreateUserDto;
    const postUpdated = await this.prisma.posts.create({
      data: {
        title: title,
        content: content,
        createBy:{
          connect:{
            id: userId
          }
        }
        // userId: userId
      }
    })
    // return 'This action adds a new post';
    return postUpdated;
  }

  async findAll() {
    const searchAllPost = await this.prisma.posts.findMany();
    return searchAllPost;
    // return `This action returns all post`;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} post`;
    const searchOnePosts = await this.prisma.posts.findUnique({
      where: { id },
      include:{
        createBy:{
          select:{
            id: true,
            firstName:true,
            lastName: true
          }
        },
        like:{
          select:{
            id:true,
            createBy:{
              select:{
                id: true,
                firstName:true,
                lastName: true
              }
            },
          }
        },
        comments:{
          select:{
            createBy:{
              select:{
                id: true,
                firstName:true,
                lastName: true
              }
            },
            content: true
          }
        }
      }
    });
    // if(!searchOnePosts){
    //   throw new NotFoundException(`Post with id ${id} not found`)
    // }
    return searchOnePosts;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const {title, content} = updatePostDto;
    await this.usersService.findOne(userId);
    const post = id && await this.findOne(id);

    if (id) {
      // console.log("a*a*a*a*a*a*a*a*a*a*a*aa*a*a*a*a")
      if (post.createBy.id !== userId) {
        throw new ForbiddenException("you have not permission to update this post");
        // console.log("azefxwsdghnbvcdghhgfd")
      }
    }

    const postUpdated = await this.prisma.posts.update({
      where: { id },
      data: {
        title: title ? title : post?.title,
        content: content ? content : post.content,
        createBy:{
          connect:{
            id: userId,
          }
          }
        // }
        // userId: userId
      }
    })
    // return 'This action adds a new post';
    return postUpdated;
  }

  async remove(id: string) {
    await this.findOne(id)
    const postDeleted = await this.prisma.posts.delete({
      where: { id },
    });
    return {message:"User delete successuful", postDeleted};
    // return `This action removes a #${id} post`;
  }
}
