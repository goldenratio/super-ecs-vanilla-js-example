import { System } from '../deps/super-ecs.js';

import { COMPONENT_NAMES } from '../components/types.js';

export class SpriteSystem extends System {
	constructor(container) {
		super();
		this._container = container;
	}

	removedFromWorld(world) {
		super.removedFromWorld(world);
	}

	addedToWorld(world) {
		super.addedToWorld(world);

		world.entityAdded$([COMPONENT_NAMES.SpriteComponent])
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

		world.entityRemoved$([COMPONENT_NAMES.SpriteComponent])
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
