import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
import { Familia } from "./Familia";
import { Usuario } from "./Usuario";
@Entity('Visita')
class Visita {
    @PrimaryColumn()
    readonly id:string;
    @Column()
    familia_id:string;
    @Column()
    agente_id:string;
    @CreateDateColumn()
    data:Date;
    @Column()
    solicitacao:string;
    @ManyToOne(()=>Familia)
    @JoinColumn({name:'familia_id'})
    familia:Familia
    @ManyToOne(()=>Usuario)
    @JoinColumn({name:'agente_id'})
    agente:Usuario;
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export {Visita}