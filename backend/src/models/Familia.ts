import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Endereco } from "./Endereco";
import { Pessoa } from "./Pessoa";
import { Usuario } from "./Usuario";
@Entity('Familia')
class Familia {
    @PrimaryColumn()
    readonly id:string;
    @Column()
    nome:string;
    @Column()
    chefe_id:string;
    @Column()
    endereco_id:string;
    @Column()
    agente_id:string;
    @OneToOne(()=>Pessoa)
    @JoinColumn({name:'chefe_id'})
    chefe:Pessoa;
    @OneToOne(()=>Endereco)
    @JoinColumn({name:'endereco_id'})
    Endereco:Endereco;
    @OneToOne(()=>Usuario)
    @JoinColumn({name:'agente_id'})
    agente:Usuario;
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
export {Familia}