import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService){}
  async create(createPostDto: CreatePostDto) {
    const {title, content} = createPostDto;
    const postUpdated = await this.prisma.posts.create({
      data: {
        title: title,
        content: content
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
    });
    if(!searchOnePosts){
      throw new NotFoundException(`Post with id ${id} not found`)
    }
    return searchOnePosts;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const {title, content} = updatePostDto;
    if(!title && !content){
      throw new BadRequestException('one or more posts is required');
    }
    const post = await this.findOne(id);
    const postUpdated = await this.prisma.posts.update({
      where: { id },
      data: {
        title: title ? title : post.title,
        content: content ? content : post.content
      },
    });
    return postUpdated;
    // return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    this.findOne(id)
    const postDeleted = await this.prisma.posts.delete({
      where: { id },
    });
    return postDeleted;
    // return `This action removes a #${id} post`;
  }
}
