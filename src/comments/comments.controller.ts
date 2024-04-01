import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post("/:userId/:postId")
  create(@Param("userId")userId: string, @Param("postId")postId: string, @Body() createCommentDto: CreateCommentDto) {
    const {content} = createCommentDto; 
    if(!content){
      throw new BadRequestException('All filds required');
    }
    if(typeof(content) != 'string'){
      throw new BadRequestException('content fields is string')
    }
    return this.commentsService.create(createCommentDto, userId, postId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch('/:id/:userId/:postId')
  update(@Param('id') id: string, @Param("userId")userId: string, @Param("postId")postId: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto, userId, postId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
