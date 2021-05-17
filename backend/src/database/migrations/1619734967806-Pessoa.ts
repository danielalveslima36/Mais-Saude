import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Pessoa1619734967806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Pessoa',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'cpf',
                    type: 'varchar'
                },
                {
                    name: 'naturalidade',
                    type: 'varchar'
                },
                {
                    name: 'cartao_sus',
                    type: 'varchar'
                },
                {
                    name: 'data_nascimento',
                    type: 'timestamp'
                },
                {
                    name: 'peso',
                    type: 'varchar'
                },
                {
                    name: 'altura',
                    type: 'varchar'
                },
                {
                    name: 'etnia',
                    type: 'varchar'
                },
                {
                    name: 'tipo_sanguineo',
                    type: 'varchar'
                },
                {
                    name: 'foto',
                    type: 'varchar'
                },
                {
                    name: 'isChefe',
                    type: 'boolean'
                },
                {
                    name: 'observacoes',
                    type: 'text'
                },
                {
                    name: 'pai',
                    type: 'varchar'
                },
                {
                    name: 'mae',
                    type: 'varchar',
                },
                {
                    name: 'familia_id',
                    type: 'uuid'
                },
            ],
            foreignKeys: [
                {
                    name: 'FKFamilia',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Familia',
                    columnNames: ['familia_id'],
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Pessoa')
    }

}
