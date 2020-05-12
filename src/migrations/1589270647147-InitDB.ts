import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitDB1589270647147 implements MigrationInterface {
    name = 'InitDB1589270647147';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `users` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `firstname` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `token_expired` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `categories` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `locationcategories` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `category_id` varchar(255) NOT NULL, `nsr` int NOT NULL, `tax` int NOT NULL, `tax_period` varchar(255) NOT NULL, `information` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `locationdetails` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `location_category_id` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `customers` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `npwp` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `firstname`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `lastname`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `email`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `password`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `phone`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `role`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `token`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `token_expired`', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `firstname` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `lastname` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `email` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `password` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `phone` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `role` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `token` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `token_expired` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `customer_id` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `location_category_id` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `location_detail_id` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `billing_id` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `skpd_number` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `type` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `start_at` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `end_at` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `approve_at` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `size` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `amount` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `user_id` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD CONSTRAINT `FK_96aac72f1574b88752e9fb00089` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` DROP FOREIGN KEY `FK_96aac72f1574b88752e9fb00089`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `user_id`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `amount`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `size`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `approve_at`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `end_at`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `start_at`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `type`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `skpd_number`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `billing_id`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `location_detail_id`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `location_category_id`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `customer_id`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `token_expired`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `token`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `role`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `phone`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `password`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `email`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `lastname`', undefined);
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `firstname`', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `token_expired` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `token` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `role` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `phone` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `password` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `email` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `lastname` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `users` ADD `firstname` varchar(255) NOT NULL', undefined);
        await queryRunner.query('DROP TABLE `customers`', undefined);
        await queryRunner.query('DROP TABLE `locationdetails`', undefined);
        await queryRunner.query('DROP TABLE `locationcategories`', undefined);
        await queryRunner.query('DROP TABLE `categories`', undefined);
        await queryRunner.query('DROP TABLE `users`', undefined);
    }

}
