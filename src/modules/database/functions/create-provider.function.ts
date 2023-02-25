import { Type } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { DB_DEFAULT_CONNECTION } from '../../../constants';
import { DatabaseEntity } from '../classes/entity.class';

export function CreateDatabaseEntityProvider(
  token: string,
  entity: Type<DatabaseEntity>,
  collection: string,
) {
  return {
    provide: token,
    useFactory: (connection: mongoose.Connection) => {
      return getModelForClass(entity, {
        existingConnection: connection,
        schemaOptions: {
          collection: collection,
          read: 'nearest',
          versionKey: false,
        },
      });
    },
    inject: [DB_DEFAULT_CONNECTION],
  };
}
