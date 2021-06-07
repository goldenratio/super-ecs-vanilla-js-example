import { COMPONENT_NAMES } from './types.js';

export class RandomMovementComponent {
	/**
	 * @param [props]
	 */
	constructor(props) {
		const { speed = 2, direction = 1 } = props || {};
		this.speed = speed;
		this.direction = direction;
		this.name = COMPONENT_NAMES.RandomMovementComponent;
	}
}
