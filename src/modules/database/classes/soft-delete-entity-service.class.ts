import { DocumentType } from '@typegoose/typegoose';
import { DatabaseEntityService } from './entity-service.class';
import { DatabaseSoftDeleteEntity } from './soft-delete-entity.class';
import { DatabaseSoftDeleteRepository } from './soft-delete-repository.class';

export abstract class DatabaseSoftDeleteEntityService<
  T extends DatabaseSoftDeleteEntity,
> extends DatabaseEntityService<T> {
  constructor(protected readonly repository: DatabaseSoftDeleteRepository<T>) {
    super(repository);
  }

  async trashed(
    filter: object,
    options: {
      sort?: string;
      limit?: number | string;
      skip?: number | string;
      search?: string;
    } = {},
  ) {
    const result = await this.repository.findTrashed(
      filter,
      options.sort,
      options.limit,
      options.skip,
      options.search,
    );
    const total = await this.repository.countTrashed(filter, options.search);

    return { result, total };
  }

  softdelete(entity: DocumentType<T>) {
    const id = typeof entity === 'string' ? entity : entity._id;
    return this.repository.softdelete({ _id: id });
  }

  restore(entity: DocumentType<T> | string) {
    const id = typeof entity === 'string' ? entity : entity._id;
    return this.repository.restore({ _id: id });
  }
}
