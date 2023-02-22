import { DocumentType } from '@typegoose/typegoose';
import { PopulateOptions } from 'mongoose';
import { DatabaseRepository } from './repository.class';
import { DatabaseSoftDeleteEntity } from './soft-delete-entity.class';

export abstract class DatabaseSoftDeleteRepository<
  T extends DatabaseSoftDeleteEntity,
> extends DatabaseRepository<T> {
  get filter(): object {
    return { _deleted: null };
  }

  async findTrashed(
    filter: any,
    sort: any = '-created',
    limit: number | string = 25,
    skip: number | string = 0,
    search?: string,
    populate?: PopulateOptions[],
  ) {
    const query = { _deleted: { $ne: null }, ...filter };
    return this.findMany(query, sort, limit, skip, search, populate);
  }

  async countTrashed(filter: any, search?: string) {
    const query = { _deleted: { $ne: null }, ...filter };
    return this.count(query, search);
  }

  async softdelete(filter: any) {
    const result = await this.entity
      .findOneAndUpdate(filter, { deleted: new Date() }, { new: true })
      .populate(this.populate);

    return result as DocumentType<T>;
  }

  async restore(filter: any) {
    const result = await this.entity
      .findOneAndUpdate(filter, { deleted: null }, { new: true })
      .populate(this.populate);

    return result as DocumentType<T>;
  }
}
