import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitDB1591768539227 implements MigrationInterface {
    name = 'InitDB1591768539227';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `users` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `firstname` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `token_expired` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `customers` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `npwp` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `subdistricts` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `weight` float NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `customer_billboards` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `customer_id` varchar(255) NOT NULL, `billing_id` varchar(255) NOT NULL, `skpd_number` varchar(255) NOT NULL, `billboard_id` varchar(255) NOT NULL, `subdistrict_id` varchar(255) NOT NULL, `billboard_weight` float NOT NULL, `billboard_total` float NOT NULL, `subdistrict_weight` float NOT NULL, `user_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `billboards` (`id` varchar(255) NOT NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `weight` float NOT NULL, `price` float NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` ADD CONSTRAINT `FK_982344f724764fad1eccdcbf84a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` ADD CONSTRAINT `FK_fa63d9ff1b6ba64a81c13ef397f` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` ADD CONSTRAINT `FK_8775146cb18870d44b82add6e8f` FOREIGN KEY (`billboard_id`) REFERENCES `billboards`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` ADD CONSTRAINT `FK_d881ae9f05bf00aaf1b148481d0` FOREIGN KEY (`subdistrict_id`) REFERENCES `subdistricts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `customer_billboards` DROP FOREIGN KEY `FK_d881ae9f05bf00aaf1b148481d0`', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` DROP FOREIGN KEY `FK_8775146cb18870d44b82add6e8f`', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` DROP FOREIGN KEY `FK_fa63d9ff1b6ba64a81c13ef397f`', undefined);
        await queryRunner.query('ALTER TABLE `customer_billboards` DROP FOREIGN KEY `FK_982344f724764fad1eccdcbf84a`', undefined);
        await queryRunner.query('DROP TABLE `billboards`', undefined);
        await queryRunner.query('DROP TABLE `customer_billboards`', undefined);
        await queryRunner.query('DROP TABLE `subdistricts`', undefined);
        await queryRunner.query('DROP TABLE `customers`', undefined);
        await queryRunner.query('DROP TABLE `users`', undefined);
    }

}
