import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1589178923634 implements MigrationInterface {
    name = 'InitDB1589178923634'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `firstname` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `token_expired` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
