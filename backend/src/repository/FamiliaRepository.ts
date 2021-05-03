import { EntityRepository, Repository } from 'typeorm';
import { Familia } from '../models/Familia';
@EntityRepository(Familia)
class FamiliaRepository extends Repository<Familia> {
}

export {FamiliaRepository}