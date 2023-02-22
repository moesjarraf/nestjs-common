import { prop } from '@typegoose/typegoose';
import { DatabaseEntity } from './entity.class';

export abstract class DatabaseSoftDeleteEntity extends DatabaseEntity {
  @prop()
  deleted?: Date;
}
