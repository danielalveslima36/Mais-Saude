import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Familia } from "./Familia";
import { v4 as uuid } from "uuid";

@Entity('Pessoa')
class Pessoa {

    @PrimaryColumn()
    readonly id: string;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column()
    naturalidade: string;
    @Column()
    cartao_sus: string;
    @Column()
    data_nascimento: string;
    @Column()
    peso: string;
    @Column()
    altura: string;
    @Column()
    etnia: string;
    @Column()
    tipo_sanguineo: string;
    @Column()
    foto: string;
    @Column()
    isChefe: boolean;
    @Column()
    observacoes: string;
    @Column()
    pai: string;
    @Column()
    mae: string;
    @Column()
    familia_id: string;
    @ManyToOne(() => Familia)
    @JoinColumn({ name: 'familia_id' })
    familia: Familia

    constructor(parameters) {
        if (!this.id) {
            this.id = uuid()
        }
        if(!this.isChefe){
            this.isChefe = false
        }
    }
}
export { Pessoa }