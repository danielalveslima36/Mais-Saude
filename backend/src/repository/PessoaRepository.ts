import { EntityRepository, Repository } from "typeorm";
import { Pessoa } from "../models/Pessoa";
@EntityRepository(Pessoa)
class PessoaRepository extends Repository<Pessoa> {
    
}
export {PessoaRepository}