import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Usuario1619733646205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Usuario',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'password',
                },
                {
                    name: 'senha',
                    type: 'varchar',
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Usuario')
    }

}
