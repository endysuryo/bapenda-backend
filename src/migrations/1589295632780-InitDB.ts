import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitDB1589295632780 implements MigrationInterface {
    name = 'InitDB1589295632780';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `users` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `firstname` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `token_expired` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `customers` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `npwp` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `categories` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `locationdetails` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `location_category_id` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `locationcategories` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `category_id` varchar(255) NOT NULL, `nsr` int NOT NULL, `tax` int NOT NULL, `tax_period` varchar(255) NOT NULL, `information` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `billboards` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `customer_id` varchar(255) NOT NULL, `location_category_id` varchar(255) NOT NULL, `location_detail_id` varchar(255) NOT NULL, `billing_id` varchar(255) NOT NULL, `skpd_number` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `start_at` timestamp NULL, `end_at` timestamp NULL, `approve_at` timestamp NULL, `size` float NOT NULL, `amount` int NOT NULL, `user_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `locationdetails` ADD CONSTRAINT `FK_ffd5921f59150800762254b5619` FOREIGN KEY (`location_category_id`) REFERENCES `locationcategories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `locationcategories` ADD CONSTRAINT `FK_e4e792372689bb3e4eb84d4b574` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `billboards` ADD CONSTRAINT `FK_75ad44fa9a77b5528fdace7e905` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `billboards` ADD CONSTRAINT `FK_a44a68dc27b0217e70feff5712e` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `billboards` ADD CONSTRAINT `FK_447e41cd650fc22fea24bf56278` FOREIGN KEY (`location_category_id`) REFERENCES `locationcategories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `billboards` ADD CONSTRAINT `FK_e9d8706e7fa0d9d50949619cadb` FOREIGN KEY (`location_detail_id`) REFERENCES `locationdetails`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `billboards` DROP FOREIGN KEY `FK_e9d8706e7fa0d9d50949619cadb`', undefined);
        await queryRunner.query('ALTER TABLE `billboards` DROP FOREIGN KEY `FK_447e41cd650fc22fea24bf56278`', undefined);
        await queryRunner.query('ALTER TABLE `billboards` DROP FOREIGN KEY `FK_a44a68dc27b0217e70feff5712e`', undefined);
        await queryRunner.query('ALTER TABLE `billboards` DROP FOREIGN KEY `FK_75ad44fa9a77b5528fdace7e905`', undefined);
        await queryRunner.query('ALTER TABLE `locationcategories` DROP FOREIGN KEY `FK_e4e792372689bb3e4eb84d4b574`', undefined);
        await queryRunner.query('ALTER TABLE `locationdetails` DROP FOREIGN KEY `FK_ffd5921f59150800762254b5619`', undefined);
        await queryRunner.query('DROP TABLE `billboards`', undefined);
        await queryRunner.query('DROP TABLE `locationcategories`', undefined);
        await queryRunner.query('DROP TABLE `locationdetails`', undefined);
        await queryRunner.query('DROP TABLE `categories`', undefined);
        await queryRunner.query('DROP TABLE `customers`', undefined);
        await queryRunner.query('DROP TABLE `users`', undefined);
    }

}
