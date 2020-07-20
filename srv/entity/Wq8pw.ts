import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wq8pw {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int', { nullable: false })
  public addId: number;

  @Column('varchar', { length: 1024 })
  public uri: string;

  @Column('boolean')
  public antenna: boolean;
}
