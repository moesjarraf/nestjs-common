import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import {
  FilterQuery,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { DatabaseEntity } from './entity.class';

export abstract class DatabaseRepository<
  T extends DatabaseEntity,
  U extends AnyParamConstructor<T> = AnyParamConstructor<T>,
> {
  abstract get populate(): PopulateOptions[];

  get filter() {
    return {};
  }

  constructor(protected readonly entity: ReturnModelType<U>) {}

  new(data: Partial<T>) {
    return new this.entity(data) as DocumentType<T>;
  }

  async save(doc: DocumentType<T>) {
    (doc as any).updated = new Date();
    const result = await (await doc.save()).populate(this.populate);

    return result as DocumentType<T>;
  }

  async findOne(filter: any) {
    const result = await this.entity
      .findOne({ ...this.filter, ...filter })
      .populate(this.populate);

    return result as DocumentType<T>;
  }

  async findMany(
    filter: any,
    sort: any = '-created',
    limit: number | string = 25,
    skip: number | string = 0,
    search?: string,
    populate?: PopulateOptions[],
  ) {
    let query = filter;
    if (search) {
      const searchQuery = this.getSubpartsQuery(search);
      if (searchQuery) {
        query = {
          $and: [searchQuery, filter],
        };
      }
    }

    let result: DocumentType<T>[] = await this.entity
      .find({ ...this.filter, ...query })
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate(populate ?? this.populate);

    if (search && result.length === 0) {
      query = {
        $text: { $search: search },
        ...filter,
      };

      result = await this.entity
        .find({ ...this.filter, ...query })
        .sort(sort)
        .limit(Number(limit))
        .skip(Number(skip))
        .populate(this.populate);
    }

    return result;
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true },
  ) {
    const result = await this.entity
      .findOneAndUpdate({ ...this.filter, ...filter }, update as any, options)
      .populate(this.populate);

    return result as DocumentType<T>;
  }

  async findOneAndUpsert(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    const result = await this.entity
      .findOneAndUpdate({ ...this.filter, ...filter }, update as any, {
        upsert: true,
        new: true,
      })
      .populate(this.populate);

    return result as DocumentType<T>;
  }

  async count(filter: any, search?: string) {
    let query = filter;

    if (search) {
      const searchQuery = this.getSubpartsQuery(search);
      if (searchQuery) {
        query = {
          $and: [searchQuery, filter],
        };
      }
    }

    let result: number = await this.entity.countDocuments({
      ...this.filter,
      ...query,
    });

    if (search && !result) {
      query = {
        $and: [{ $text: { $search: search } }, filter],
      };
      result = await this.entity.countDocuments({ ...this.filter, ...query });
    }

    return result;
  }

  async exists(filter: any) {
    const result = await this.entity.exists({ ...this.filter, ...filter });
    return Boolean(result);
  }

  async deleteOne(filter: any) {
    const result = await this.entity.deleteOne({ ...this.filter, ...filter });
    return result.acknowledged;
  }

  async deleteMany(filter: any) {
    const result = await this.entity.deleteMany({ ...this.filter, ...filter });
    return result.acknowledged;
  }

  protected getSchemaProperties() {
    const { paths } = this.entity.schema;
    return Object.keys(paths).reduce((acc, key) => {
      acc[key] = Object.assign({}, paths[key].options);
      return acc;
    }, {});
  }

  protected getSubpartsQuery(search?: string): any {
    if (!search) {
      return;
    }

    const query = this.buildSearchQuery(search, this.getSchemaProperties());

    if (query.$or.length === 0) {
      return;
    }

    return query;
  }

  protected buildSearchQuery(
    search: string,
    obj: object,
    fieldParent?: string,
    query = { $or: [] },
  ) {
    for (const [name, field] of Object.entries<any>(obj)) {
      const key = fieldParent ? `${fieldParent}.${name}` : name;

      if (field.text) {
        const customKey = key;

        query.$or.push({
          [customKey]: new RegExp(search, 'gi'),
        });
      }

      if (field.type?.obj) {
        this.buildSearchQuery(search, field.type.obj, key, query);
      }
    }

    return query;
  }
}
