import { COMPONENT_NAMES } from '../components/types.js';

export class SceneSystem extends superECS.System {
	constructor(container) {
		super();
		this._container = container;
	}

	removedFromWorld(world) {
		super.removedFromWorld(world);
		if (this._disposeBag) {
			this._disposeBag.dispose();
		}
	}

	addedToWorld(world) {
		super.addedToWorld(world);

		this._disposeBag = new superECS.DisposeBag();

		this._disposeBag
			.completable$(world.entityAdded$([COMPONENT_NAMES.SpriteComponent]))
			.subscribe(entity => {
				const spriteComponent = entity.getComponent(
					COMPONENT_NAMES.SpriteComponent
				);
				if (!spriteComponent) {
					return;
				}

				const { sprite } = spriteComponent;
				if (sprite) {
					this._container.addChild(sprite);
				}
			});

		this._disposeBag
			.completable$(world.entityRemoved$([COMPONENT_NAMES.SpriteComponent]))
			.subscribe(entity => {
				const spriteComponent = entity.getComponent(
					COMPONENT_NAMES.SpriteComponent
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