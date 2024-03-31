import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, phonne, firstName,lastName } = createUserDto;
    // return {message: 'New user added successfuly', userName};
    const newUser = await this.prisma.users.create({
      data: {
        firstName: firstName,
        email: email,
        lastName: lastName,
        phonneNumber:phonne,
      },
    });
    // return newUser;
    return newUser;
  }

  async findAll() {
    // return `This action returns all users`;
    const searchAll = await this.prisma.users.findMany();
    return searchAll;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} user`;
    const searchOne = await this.prisma.users.findUnique({
      where: { id },
    });
    if(!searchOne){
      throw new NotFoundException(`User with id ${id} not found fdfdfd`)
    }
    return searchOne;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const { email, phonne, firstName,lastName } = updateUserDto;
    if(!email && !phonne && !firstName && !lastName){
      throw new BadRequestException('one or more filds is required')
    }
    const user = await this.findOne(id)
    const userUpdated = await this.prisma.users.update({
      where: { id },
      data: {
        firstName: firstName ? firstName : user.firstName,
        email: email ? email : user.email,
        lastName: lastName ? lastName : user.lastName,
        phonneNumber:phonne ? phonne : user.phonneNumber,
      },
    });
    return userUpdated;
  }

  async remove(id: string) {
    // return `This action removes a #${id} user`;
   await this.findOne(id);
    
    const userDeleted = await this.prisma.users.delete({
      where: { id },
    });
    return userDeleted;
  }
}
