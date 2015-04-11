// Defines the arrow object
function Arrow(rotation, speed)
{
	var x = _config.arrows.startX,
		y = _config.arrows.startY,
		hSpeed = Math.cos(rotation) * speed,
		vSpeed = Math.sin(rotation) * speed,
		vAsc = _config.arrows.gravity,
		flying = true;

	this.update = function()
	{
		if (y >= _config.arrows.lowerLimit) {
			flying = false;
		}

		if (flying) {

			vSpeed += vAsc;
			rotation = Math.atan(vSpeed / hSpeed);
			
			x += hSpeed;
			y += vSpeed;
		}
	}

	this.draw = function(ctx)
	{
		ctx.lineWidth = 1;
		var scale = _config.arrows.scale;

		// Draw shaft
		ctx.beginPath();
		ctx.moveTo(x - (8 * scale * Math.cos(rotation)), y - (8 * scale * Math.sin(rotation)));
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.strokeStyle = '#000';
		ctx.stroke();

		// Draw head
		var headAngle = (Math.PI / 4);
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x - (2 * scale * Math.cos(rotation - headAngle)), y - (2 * scale * Math.sin(rotation - headAngle)));
		ctx.moveTo(x, y);
		ctx.lineTo(x - (2 * scale * Math.cos(rotation + headAngle)), y - (2 * scale * Math.sin(rotation + headAngle)));
		ctx.closePath();
		ctx.strokeStyle = '#F00';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, 50, 0, 2*Math.PI);
		ctx.stroke();
	}
}