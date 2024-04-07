import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("/:userId/:postId")
  create(@Param("userId")userId: string, @Param("postId")postId: string, @Body() createLikeDto: CreateLikeDto) {
    // const {title} = createLikeDto; 
    // if(!title){
    //   throw new BadRequestException('All filds required');
    // }
    // if(typeof(title) != 'string'){
    //   throw new BadRequestException('content fields is string')
    // }
    return this.likesService.create(createLikeDto, userId, postId);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}
