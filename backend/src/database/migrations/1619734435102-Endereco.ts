import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Endereco1619734435102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Endereco',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'rua',
                    type: 'varchar',
                },
                {
                    name: 'numero',
                    type: 'varchar'
                },
                {
                    name: 'complemento',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'varchar',
                },
                {
                    name: 'cidade',
                    type: 'varchar'
                },
                {
                    name: 'estado',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Endereco')
    }

}
