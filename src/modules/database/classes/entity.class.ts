import { prop } from '@typegoose/typegoose';

export abstract class DatabaseEntity {
  @prop({ required: true, default: Date.now })
  created: Date;

  @prop({ required: true, default: Date.now })
  updated: Date;

  setValues<T extends DatabaseEntity>(this: T, obj: Partial<T>) {
    const data = Object.assign({}, obj);

    Object.assign(this, data);
  }

  toJSON<T extends DatabaseEntity>(this: T) {
    const data = Object.assign({}, (this as any)._doc);

    data.id = data._id;
    delete data._id;

    return data;
  }

  is(entity: { _id: string } | string): boolean {
    const id = String((this as any)._id);
    return typeof entity === 'string' ? id === entity : id === entity._id;
  }

  isInstanceOf<T>(c: new (...[]) => T) {
    const childClass = Object.getPrototypeOf(this).constructor;
    return c.name === childClass.name;
  }
}
