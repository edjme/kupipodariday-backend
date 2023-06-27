import { Column, Entity, OneToMany } from 'typeorm';
import { BaseClass } from '../../base/base-class';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
@Entity()
export class User extends BaseClass {
  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Имя пользователя слишком короткое, минимум 2 символа',
  })
  @MaxLength(30, {
    message: 'Имя пользователя слишком длинное, максимум 30 символов',
  })
  username: string;
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @MinLength(2, {
    message: 'Информации слишком мало, минимум 2 символа',
  })
  @MaxLength(200, {
    message: 'Информации слишком много, максимум 30 символов',
  })
  about: string;

  @Column({
    default: 'htts://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
