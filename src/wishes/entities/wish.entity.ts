import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseClass } from '../../base/base-class';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class Wish extends BaseClass {
  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Название слишком короткое, минимум 1 символ',
  })
  @MaxLength(250, {
    message: 'Название слишком длинное, максимум 250 символов',
  })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column()
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  price: number;

  @Column({
    default: 0,
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  raised: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  description?: string;
  @Column({ default: 0 })
  copied?: number;
  @ManyToOne(() => User, (owner) => owner.wishes)
  owner: User;
  @ManyToOne(() => Offer, (offer) => offer.item)
  offers: Offer[];
  @ManyToOne(() => Wishlist, (wishList) => wishList.itemsId)
  wishlist: Wishlist;
}
