import { PositionComponent } from './components/position-component.js';
import { SpriteComponent } from './components/sprite-component.js';
import { RandomMovementComponent } from './components/random-movement-component.js';
import { PositionSystem } from './systems/position-system.js';
import { SpriteSystem } from './systems/sprite-system.js';
import { RandomMovementSystem } from './systems/random-movement-system.js';

const app = new PIXI.Application({
	width: 600,
	height: 400,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio || 1,
	sharedTicker: true,
});

document.body.appendChild(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);

PIXI.loader
	.add('p1', './assets/p1_front.png')
	.add('p2', './assets/p2_front.png')
	.load(() => init());

function init() {
	const world = new superECS.World();

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

	const hero = new superECS.Entity();
	hero
		.addComponent(new PositionComponent({ x, y }))
		.addComponent(new RandomMovementComponent({ direction }))
		.addComponent(
			new SpriteComponent({
				sprite: new PIXI.Sprite(PIXI.Texture.fromFrame(textureName)),
			}),
		);

	return hero;
}
