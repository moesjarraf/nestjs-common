import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EmitterService<T> implements OnModuleDestroy {
  private subjects = new Map<string, Subject<any>>();

  emit(event: keyof T, data: T[keyof T]) {
    // @todo: make it possible to await the emit so you can be notified if the listeners are all done
    const key = event as string;

    if (this.subjects.has(key)) {
      this.subjects.get(key).next(data);
    }
  }

  on<K extends keyof T>(event: K, callback: (val: T[K]) => void) {
    this.observe(event).subscribe(callback);
  }

  observe(event: keyof T): Subject<T[keyof T]> {
    const key = event as string;

    if (!this.subjects.has(key)) {
      this.subjects.set(key, new Subject());
    }

    return this.subjects.get(key);
  }

  once(event: keyof T, callback: (val: T[keyof T]) => void) {
    const cb = (val: T[keyof T]) => {
      this.off(event, cb);
      return callback(val);
    };
    this.on(event, cb);
  }

  off(event: keyof T, callback: (val: T[keyof T]) => void) {
    if (!this.subjects.has(event as string)) return;

    const { observers } = this.subjects.get(event as string);
    const index = observers.findIndex((ob: any) =>
      ob._subscriptions.some(
        (any) => any.subscriber.destination._next === callback,
      ),
    );

    if (index > -1) observers.splice(index, 1);
  }

  waitFor(event: keyof T) {
    return new Promise((resolve) => this.once(event, resolve));
  }

  onModuleDestroy() {
    for (const [, subject] of this.subjects) {
      subject.unsubscribe();
    }

    this.subjects.clear();
  }
}
