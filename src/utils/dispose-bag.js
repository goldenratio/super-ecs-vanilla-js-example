import { Subject, takeUntil } from '../deps/rx.js';

/**
 * Interface representing a disposable resource.
 * @typedef {Object} Disposable
 * @property {Function} dispose - Method to dispose of the resource.
 */

/**
 * Callback function type for disposal.
 * @typedef {Function} DisposeCallback
 * @returns {void}
 */


export class DisposeBag {
  _dispose$ = new Subject();
  _list = new Set();
  _isDisposed = false;

  /**
   * @param { Disposable | DisposeCallback } item
   */
  add(item) {
    if (this._isDisposed) {
      throw new Error('disposeBag already disposed, create a new disposeBag');
    }
    this._list.add(() => {
      if (typeof item === 'function') {
        item();
      } else {
        item.dispose();
      }
    });
  }

  /**
   * @param {Observable<T>} item$
   * @returns {Observable<T>}
   */
  completable$(item$) {
    if (this._isDisposed) {
      throw new Error('disposeBag already disposed, create a new disposeBag');
    }
    return item$.pipe(takeUntil(this._dispose$));
  }

  dispose() {
    this._isDisposed = true;
    this._dispose$.next();
    this._dispose$.complete();

    this._list.forEach(cb => cb());
    this._list.clear();
  }
}
