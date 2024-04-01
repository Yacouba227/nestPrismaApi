import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("/:userId")
  create(@Param("userId")userId: string, @Body() createPostDto: CreatePostDto) {
    const {title, content} = createPostDto;
    // console.log(userId);
    
    if(!title || !content){
      throw new BadRequestException('All filds required');
    }
    if(typeof(title) != 'string'){
      throw new BadRequestException('title fields is string')
    }
    if(typeof(content) != 'string'){
      throw new BadRequestException('title fields is string')
    }
    return this.postService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch('/:id/:userId')
  update(@Param('id') id: string, @Param("userId")userId: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
