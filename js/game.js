// Handles te actual game
function Game(canvas)
{
	this.canvas = canvas;
	intervalId;
	var ctx = this.canvas.getContext("2d"),
		game = this,
		intervalId,
		worldObjects = [],
		arrows = [],
		enemies = [],
		base,
		stopCallback,
		isRunning = false,
		isTestMode = false,
		score = 0;

	var detectHits = function()
	{
		// Loop backwards to prevent issues with splicing
		for (var j = enemies.length - 1; j >= 0; j--) {
			var enemy = enemies[ j ];

			// Check arrows
			for (var i = arrows.length - 1; i >= 0; i--) {
				var arrow = arrows[ i ];
				if (arrow.isFlying()) {
					if (arrow.hits(enemy)) {
						game.removeEnemyFromWorld(enemy);
						game.removeArrowFromWorld(arrow);
						score++;
						break;
					}
				}
			}

			// Check base
			if (base.canBeAttackedBy(enemy)) {
				enemy.attack(base);
				if (base.isDestroyed()) {
					// draw new state before stopping
					draw();
					game.stop();
					break;
				}
			}
		}
	}

	var update = function()
	{
		// Loop backwards to prevent issues with splicing
		for (var i = worldObjects.length - 1; i >= 0; i--) {
			var updateObj = worldObjects[ i ];
			if (typeof updateObj.update == 'function') {
				updateObj.update();
			}
		}
	}

	var draw = function()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);

		// Draw some scenery
		ctx.fillStyle = '#960';
		ctx.fillRect(0, _config.base.y, canvas.width, canvas.height - _config.base.y);

		// Loop backwards to prevent issues with splicing
		for (var i = worldObjects.length - 1; i >= 0; i--) {
			var drawObj = worldObjects[ i ];
			if (typeof drawObj.draw == 'function') {
				drawObj.draw(ctx);
			}
		}
	}

	var spawn = function()
	{
		if (!isTestMode) {
			if (Math.random() < _config.randomSpawnRate) {
				var enemy = new Enemy();
				game.addEnemyToWorld(enemy);
			}
		}
	}

	var loop = function()
	{
		spawn();
		detectHits();
		// check if game is still running after hit detection
		if (isRunning) {
			update();
			draw();
		}
	}

	var init = function()
	{
		base = new Base();
		game.addObjectToWorld(base);

		draw();
	}

	game.start = function(testMode)
	{
		isTestMode = testMode;
		score = 0;
		var interaction = new Interaction(this);
		game.addObjectToWorld(interaction);

		base.revive();
		game.addObjectToWorld(base);

		if (isTestMode) {
			window.addEventListener('keypress', handleKeyPress);
		}

		intervalId = setInterval(loop, 1000 / _config.fps);
		isRunning = true;
	}

	var handleKeyPress = function(e)
	{
		var k = e ? e.which : event.keyCode;
		if (k == 32) {
			game.addEnemyToWorld(new Enemy());
		}
	}

	game.stop = function()
	{
		if (intervalId) {
			isRunning = false;
			clearInterval(intervalId);
			worldObjects = [];
			arrows = [];
			enemies = [];
			if (isTestMode) {
				window.removeEventListener('keypress', handleKeyPress);
			}

			if (stopCallback) {
				stopCallback(score);
			}
		}
	}

	game.onStop = function(cb)
	{
		stopCallback = cb;
	}

	game.addObjectToWorld = function(obj)
	{
		worldObjects.push(obj);
	}

	game.removeObjectFromWorld = function(obj)
	{
		removeElementFromArray(obj, worldObjects);
	}

	game.addArrowToWorld = function(arrow)
	{
		arrows.push(arrow);
		this.addObjectToWorld(arrow);
	}

	game.removeArrowFromWorld = function (arrow)
	{
		removeElementFromArray(arrow, arrows);
		this.removeObjectFromWorld(arrow);
	}

	game.addEnemyToWorld = function(enemy)
	{
		enemies.push(enemy);
		this.addObjectToWorld(enemy);
	}

	game.removeEnemyFromWorld = function(enemy)
	{
		removeElementFromArray(enemy, enemies);
		this.removeObjectFromWorld(enemy);
	}

	var removeElementFromArray = function(element, arr)
	{
		var elementIndex = arr.indexOf(element);
		if (elementIndex !== -1) {
			arr.splice(elementIndex, 1);
		}
	}

	init();
}