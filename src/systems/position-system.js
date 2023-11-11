import { System } from '../deps/super-ecs.js';

import { COMPONENT_NAMES } from '../components/types.js';

export class PositionSystem extends System {

	update(tickerData) {
		const entities = this.world.getEntities([
			COMPONENT_NAMES.PositionComponent,
			COMPONENT_NAMES.SpriteComponent,
		]);
		if (entities.length === 0) {
			return;
		}

		entities.forEach(entity => {
      /** @type { PositionComponent } **/
			const positionComponent = entity.getComponent(
				COMPONENT_NAMES.PositionComponent,
			);

      /** @type { SpriteComponent } **/
			const spriteComponent = entity.getComponent(
				COMPONENT_NAMES.SpriteComponent,
			);

			if (positionComponent && spriteComponent) {
				const { sprite } = spriteComponent;
				sprite.position.set(positionComponent.x, positionComponent.y);
			}
		});
	}
}
