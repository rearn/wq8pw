/* eslint-disable vue/max-len */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Initialize1595338181428 implements MigrationInterface {
  public name = 'Initialize1595338181428';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `wq8pw` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `uri` varchar(1024) NOT NULL, `antenna` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `wq8pw`');
  }
}
