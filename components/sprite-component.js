import { COMPONENT_NAMES } from './types.js';

export class SpriteComponent {
	/**
	 *
	 * @param [props]
	 */
	constructor(props) {
		const { sprite = new PIXI.Sprite() } = props || {};
		this.sprite = sprite;
		this.name = COMPONENT_NAMES.SpriteComponent;
	}
}
