import { System } from '../deps/super-ecs.js';

import { COMPONENT_NAMES } from '../components/types.js';

export class RandomMovementSystem extends System {

	constructor(props = { width: 600, height: 400 }) {
		super();
		this._stageWidth = props.width;
		this._stageHeight = props.height;
	}

	update(tickerData) {
		const entities = this.world.getEntities([
			COMPONENT_NAMES.PositionComponent,
			COMPONENT_NAMES.RandomMovementComponent,
		]);

		if (entities.length === 0) {
			return;
		}

		const { deltaTime } = tickerData;
		entities.forEach(entity => {
			const positionComponent = entity.getComponent(
				COMPONENT_NAMES.PositionComponent,
			);
			const randomMovementComponent =
				entity.getComponent(
					COMPONENT_NAMES.RandomMovementComponent,
				);

			if (positionComponent && randomMovementComponent) {
				const { speed, direction } = randomMovementComponent;
				positionComponent.x += speed * direction * deltaTime;
				positionComponent.y += speed * direction * deltaTime;

				const stageWidth = this._stageWidth;
				const stageHeight = this._stageHeight;

				const offset = 92;

				if (positionComponent.x < -offset)
					positionComponent.x = stageWidth + offset;

				if (positionComponent.y < -offset)
					positionComponent.y = stageHeight + offset;

				if (positionComponent.x > stageWidth + offset)
					positionComponent.x = -offset;

				if (positionComponent.y > stageHeight + offset)
					positionComponent.y = -offset;
			}
		});
	}
}
