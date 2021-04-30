import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('Usuario')
class Usuario {
    @PrimaryColumn()
    readonly id: string;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column()
    email: string;
    @Column()
    senha: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
export { Usuario }