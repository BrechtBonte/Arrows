// General config file
var _config = {
	fps: 50,
	randomSpawnRate: 0.01,
	interaction: {
		lineWidth: 2,
		maxLength: 200,
		lineColor: '#000',
		lastLineColor: '#F00'
	},
	arrows: {
		startX: 50,
		startY: 234,
		lowerLimit: 290,
		gravity: 0.3,
		maxSpeed: 15,
		scale: 2,
		maxCount: 20
	},
	enemies: {
		startX: 850,
		startY: 290,
		speed: 2,
		scale: 3,
		damage: 5,
		attackTimeout: 20
	},
	base: {
		x: 47,
		y: 290,
		maxHealth: 100
	}
};