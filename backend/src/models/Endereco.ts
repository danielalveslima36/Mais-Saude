import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity('Endereco')
class Endereco {
    @PrimaryColumn()
    readonly id:string;
    @Column()
    rua:string;
    @Column()
    numero:string;
    @Column()
    complemento:string;
    @Column()
    cep:string;
    @Column()
    cidade:string;
    @Column()
    estado:string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
export {Endereco}