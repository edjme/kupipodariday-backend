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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}
  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(req.user, createWishlistDto);
  }
  @Get()
  async findAll() {
    return this.wishlistsService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.wishlistsService.findById(+id);
  }
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishlistsService.update(req.user, +id, updateWishlistDto);
  }
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return await this.wishlistsService.remove(+req.user.id, +id);
  }
}
