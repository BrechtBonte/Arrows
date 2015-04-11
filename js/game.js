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
		enemies = [];

	var detectHits = function()
	{
		// Loop backwards to prevent issues with splicing
		for (var i = arrows.length - 1; i >= 0; i--) {
			var arrow = arrows[ i ];

			// Don't check grounded arrows
			if (arrow.isFlying()) {
				for (var j = enemies.length - 1; j >= 0; j--) {
					var enemy = enemies[ j ];
					if (arrow.hits(enemy)) {
						game.removeEnemyFromWorld(enemy);
						game.removeArrowFromWorld(arrow);
						break;
					}
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
		// Loop backwards to prevent issues with splicing
		for (var i = worldObjects.length - 1; i >= 0; i--) {
			var drawObj = worldObjects[ i ];
			if (typeof drawObj.draw == 'function') {
				drawObj.draw(ctx);
			}
		}
	}

	var loop = function()
	{
		detectHits();
		update();
		draw();
	}

	game.start = function()
	{
		var interaction = new Interaction(this);
		worldObjects.push(interaction);

		var game = this;
		window.addEventListener('keypress', function(e) {
			var k = e ? e.which : event.keyCode;
			if (k == 32) {
				game.addEnemyToWorld(new Enemy());
			}
		});

		intervalId = setInterval(loop, 1000 / _config.fps);
	}

	game.stop = function()
	{
		if (intervalId) {
			clearInterval(intervalId);
		}
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
}