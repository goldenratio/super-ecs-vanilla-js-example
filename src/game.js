import { World, Entity } from './deps/super-ecs.js';
import { Application, Container, Assets, Sprite, Texture } from './deps/pixi.js';

import { PositionComponent } from './components/position-component.js';
import { SpriteComponent } from './components/sprite-component.js';
import { RandomMovementComponent } from './components/random-movement-component.js';
import { PositionSystem } from './systems/position-system.js';
import { SpriteSystem } from './systems/sprite-system.js';
import { RandomMovementSystem } from './systems/random-movement-system.js';

const app = new Application({
	width: 600,
	height: 400,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio || 1,
	sharedTicker: true,
});

document.body.appendChild(app.view);
const container = new Container();
app.stage.addChild(container);

Assets.addBundle('assets', {
  'p1': './assets/p1_front.png',
  'p2': './assets/p2_front.png'
});

Assets.loadBundle('assets')
  .then(() => init());

function init() {
	const world = new World();

	// systems
	world
		.addSystem(new SpriteSystem(container))
		.addSystem(new PositionSystem())
		.addSystem(new RandomMovementSystem());

	// entities
	Array.from({ length: 50 }).forEach(() => {
		const entity = createHeroEntity();
		world.addEntity(entity);
	});

	// game loop
	app.ticker.add(deltaTime => world.update({
    deltaTime,
    // todo: find out below values
    elapsedMS: 0,
    lastTime: 0,
  }));
}

function createHeroEntity() {
	const direction = Math.floor(Math.random() * 10) > 5 ? -1 : 1;
	const x = Math.floor(Math.random() * 600);
	const y = Math.floor(Math.random() * 400);
	const textureName = Math.floor(Math.random() * 10) > 5 ? 'p1' : 'p2';

	const hero = new Entity();
	hero
		.addComponent(new PositionComponent({ x, y }))
		.addComponent(new RandomMovementComponent({ direction }))
		.addComponent(
			new SpriteComponent({
				sprite: new Sprite(Texture.from(textureName)),
			}),
		);

	return hero;
}
