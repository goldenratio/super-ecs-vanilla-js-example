import { System } from '../deps/super-ecs.js';

import { COMPONENT_NAMES } from '../components/types.js';
import { DisposeBag } from "../utils/dispose-bag.js";

/**
 * @typedef {import('../deps/pixi.js').Container} Container
 */

/**
 * @typedef {import('../deps/super-ecs.js').World} World
 */


export class SpriteSystem extends System {

  /**
   * @type { DisposeBag | undefined }
   * @private
   */
  _disposeBag = undefined;

  /**
   * @param { Container } container
   */
	constructor(container) {
		super();
		this._container = container;
	}

  /**
   * @param { World } world
   */
	removedFromWorld(world) {
		super.removedFromWorld(world);
    if (this._disposeBag) {
      this._disposeBag.dispose();
      this._disposeBag = undefined;
    }
	}

  /**
   * @param { World } world
   */
	addedToWorld(world) {
		super.addedToWorld(world);

    this._disposeBag = new DisposeBag();

		this._disposeBag.completable$(world.entityAdded$([COMPONENT_NAMES.SpriteComponent]))
			.subscribe(entity => {
				const spriteComponent = entity.getComponent(
					COMPONENT_NAMES.SpriteComponent,
				);
				if (!spriteComponent) {
					return;
				}

				const { sprite } = spriteComponent;
				if (sprite) {
					this._container.addChild(sprite);
				}
			});

    this._disposeBag.completable$(world.entityRemoved$([COMPONENT_NAMES.SpriteComponent]))
			.subscribe(entity => {
				const spriteComponent = entity.getComponent(
					COMPONENT_NAMES.SpriteComponent,
				);
				if (!spriteComponent) {
					return;
				}

				const { sprite } = spriteComponent;
				if (sprite) {
					this._container.removeChild(sprite);
				}
			});
	}
}
