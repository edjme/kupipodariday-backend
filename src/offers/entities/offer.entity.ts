import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseClass } from '../../base/base-class';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsNumber } from 'class-validator';

@Entity()
export class Offer extends BaseClass {
  @Column()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  amount: number;
  @Column({
    default: false,
  })
  @IsBoolean()
  hidden: boolean;
  @ManyToOne(() => User, (user) => user.offers)
  user: User;
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}
