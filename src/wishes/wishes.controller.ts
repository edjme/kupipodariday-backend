import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  @Get('last')
  async findLastWishes() {
    return await this.wishesService.lastWishes();
  }
  @Get('top')
  async findTopWishes() {
    return await this.wishesService.topWishes();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.wishesService.findById(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return await this.wishesService.update(+id, updateWishDto, +req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return await this.wishesService.remove(+id, +req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') id: string) {
    return await this.wishesService.copyWish(+id, req.user);
  }
}
