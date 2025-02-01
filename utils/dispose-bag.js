import { Subject, takeUntil } from 'rxjs';

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

/**
 * @template T
 * @typedef {import('rxjs').Observable<T>} Observable
 */

export class DisposeBag {
  /**
   * @type {Subject<void>}
   * @private
   */
  _dispose$ = new Subject();

  /**
   * @type {Set<Disposable | DisposeCallback>}
   * @private
   */
  _list = new Set();

  /**
   * @type {boolean}
   * @private
   */
  _isDisposed = false;

  /**
   * @param { Disposable | DisposeCallback } item
   * @throws Will throw an error if the DisposeBag is already disposed.
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
   * @template T
   * @param {Observable<T>} item$
   * @returns {Observable<T>}
   * @throws Will throw an error if the DisposeBag is already disposed.
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
