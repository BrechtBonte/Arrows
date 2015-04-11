// Handles te actual game
function Game(canvas)
{
	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");
	this.intervalId;
	var drawables = [];

	var update = function()
	{
		// Update game state
	}

	var draw = function()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for (var i = 0; i < drawables.length; i++) {
			var drawObj = drawables[ i ];
			drawObj.draw();
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
		drawables.push(interaction);

		this.intervalId = setInterval(loop, 1000 / _config.fps);
	}

	this.stop = function()
	{
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}