import { COMPONENT_NAMES } from './types.js';
import { Sprite } from '../deps/pixi.js';

export class SpriteComponent {
	/**
	 * @param [props]
	 */
	constructor(props) {
		const { sprite = new Sprite() } = props || {};
		this.sprite = sprite;
		this.name = COMPONENT_NAMES.SpriteComponent;
	}
}
