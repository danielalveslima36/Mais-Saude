import { IsNull, MigrationInterface, QueryRunner, Table } from "typeorm";

export class Familia1619735959302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Familia',
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
                    name: 'endereco_id',
                    type: 'uuid',
                    isNullable: true 
                },
                {
                    name: 'agente_id',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKEndereco',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Endereco',
                    columnNames: ['endereco_id'],
                    onUpdate: 'CASCADE'
                },
                {
                    name: 'FKAgente',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Usuario',
                    columnNames: ['agente_id'],
                    onUpdate: 'CASCADE'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Familia')
    }

}
