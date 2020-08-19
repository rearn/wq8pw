import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  BaseEntity,
} from 'typeorm';

@Entity()
export default class Wq8pw extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn('bigint', { unsigned: true })
  public id!: string;

  @Column('varchar', { length: 1024, nullable: false })
  public uri = '';

  @Column('boolean', { nullable: false })
  public antenna = false;
}
