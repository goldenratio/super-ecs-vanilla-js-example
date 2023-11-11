import { COMPONENT_NAMES } from './types.js';

export class PositionComponent {
	/**
	 * @param [props]
	 */
	constructor(props) {
		const { x = 0, y = 0 } = props || {};
		this.x = x;
		this.y = y;
		this.name = COMPONENT_NAMES.PositionComponent;
	}
}
