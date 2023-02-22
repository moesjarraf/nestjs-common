import { DocumentType } from '@typegoose/typegoose';
import { DatabaseRepository } from './repository.class';
import { DatabaseEntity } from './entity.class';

export abstract class DatabaseEntityService<T extends DatabaseEntity> {
  constructor(protected readonly repository: DatabaseRepository<T>) {}

  async list(
    filter: object,
    options: {
      sort?: string;
      limit?: number | string;
      skip?: number | string;
      search?: string;
    } = {},
  ) {
    const result: any = await this.repository.findMany(
      filter,
      options.sort,
      options.limit,
      options.skip,
      options.search,
    );
    const total = await this.repository.count(filter, options.search);

    return { result: result, total };
  }

  save(entity: DocumentType<T>) {
    return this.repository.save(entity);
  }

  get(id: string) {
    return this.repository.findOne({ _id: id });
  }

  async add(data: Partial<T>) {
    const entity = await this.repository.new(data);
    return this.repository.save(entity);
  }

  update(entity: DocumentType<T>, data: Partial<T>) {
    entity.setValues(data);
    return this.repository.save(entity);
  }

  upsert(filter: any, data: Partial<T>) {
    return this.repository.findOneAndUpsert(filter, data);
  }

  delete(entity: DocumentType<T>) {
    return this.repository.deleteOne({ _id: entity._id });
  }
}
