import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsDate } from 'class-validator';

@Entity()
export abstract class BaseClass {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
