// Handles te actual game
function Game(canvas)
{
	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");
	this.intervalId;
	var worldObjects = [];

	var update = function()
	{
		for (var i = 0; i < worldObjects.length; i++) {
			var updateObj = worldObjects[ i ];
			if (typeof updateObj.update == 'function') {
				updateObj.update();
			}
		}
	}

	var draw = function()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for (var i = 0; i < worldObjects.length; i++) {
			var drawObj = worldObjects[ i ];
			if (typeof drawObj.draw == 'function') {
				drawObj.draw(ctx);
			}
		}
	}

	var loop = function()
	{
		update();
		draw();
	}

	this.start = function()
	{
		var interaction = new Interaction(this);
		worldObjects.push(interaction);

		this.intervalId = setInterval(loop, 1000 / _config.fps);
	}

	this.stop = function()
	{
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	this.addObjectToWorld = function(obj)
	{
		worldObjects.push(obj);
	}

	this.removeObjectFromWorld = function(obj)
	{
		var objIndex = worldObjects.indexOf(obj);
		if (objIndex !== -1) {
			worldObjects.splice(objIndex, 1);
		}
	}
}