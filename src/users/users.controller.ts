import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Req() req): Promise<User> {
    return await this.usersService.findById(req.user.id);
  }
  @Patch('me')
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async findMyWishes(@Req() req): Promise<Wish[]> {
    return await this.usersService.findUserWishes(req.user.id);
  }
  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    return user;
  }
  @Get(':username/wishes')
  async findWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    const { id } = await this.usersService.findByUsername(username);
    if (!id) throw new NotFoundException('Пользователь не найден');
    const wishes = await this.usersService.findUserWishes(id);
    return wishes;
  }

  @Post('find')
  async findByEmail(@Body() query: string): Promise<User[]> {
    const user = await this.usersService.findByEmail(query);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }
  @Get(':id')
  findBy(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
