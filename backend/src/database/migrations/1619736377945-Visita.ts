import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Visita1619736377945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Visita',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'data',
                    type: 'timestamp',
                    default:'now()'
                },
                {
                    name: 'solicitacao',
                    type: 'text'
                },
                {
                    name: 'familia_id',
                    type: 'uuid'
                },
                {
                    name: 'agente_id',
                    type: 'uuid'
                },
            ],
            foreignKeys: [
                {
                    name: 'FKFamlia',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Familia',
                    columnNames: ['familia_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                {
                    name: 'FKAgente',
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Usuario',
                    columnNames: ['agente_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Visita')
    }

}
