// Describes an enemy
var Enemy = function()
{
	var x = _config.enemies.startX,
		y = _config.enemies.startY,
		speed = _config.enemies.speed,
		scale = _config.enemies.scale,
		moving = true;

	this.update = function()
	{
		x -= speed;
	}

	this.draw = function(ctx)
	{
		ctx.lineWidth = 1;

		ctx.beginPath();
		// Legs
		ctx.moveTo(x - (1 * scale), y);
		ctx.lineTo(x, y - (2 * scale));
		ctx.lineTo(x + (1 * scale), y);
		// Body
		ctx.moveTo(x, y - (2 * scale));
		ctx.lineTo(x, y - (6 * scale));
		// Arms
		ctx.lineTo(x - (1 * scale), y - (4 * scale));
		ctx.moveTo(x, y - (6 * scale));
		ctx.lineTo(x + (1 * scale), y - (4 * scale));
		// Head
		ctx.moveTo(x + (1 * scale), y - (7 * scale));
		ctx.arc(x, y - (7 * scale), 1 * scale, 0, 2*Math.PI);
		ctx.closePath();
		ctx.strokeStyle = '#0F0';
		ctx.stroke();
	}

	this.getHitbox = function()
	{
		return {
			left: x - (1 * scale),
			right: x + (1 * scale),
			top: y - (8 * scale),
			bottom: y
		}
	}
}