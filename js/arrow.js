// Defines the arrow object
function Arrow(rotation, speed)
{
	var x = _config.arrows.startX,
		y = _config.arrows.startY,
		hSpeed = Math.cos(rotation) * speed,
		vSpeed = Math.sin(rotation) * speed,
		vAsc = _config.arrows.gravity,
		scale = _config.arrows.scale,
		flying = true;

	this.update = function()
	{
		if (flying) {

			vSpeed += vAsc;
			rotation = Math.atan(vSpeed / hSpeed);
			
			x += hSpeed;
			y += vSpeed;

			// Check floor boundry
			if (y >= _config.arrows.lowerLimit) {
				flying = false;

				var dY = y - _config.arrows.lowerLimit;
				if (dY) {
					var dX = dY / Math.tan(rotation);
					y -= dY;
					x -= dX;
				}
			}
		}
	}

	this.draw = function(ctx)
	{
		ctx.lineWidth = 1;

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
	}

	this.isFlying = function()
	{
		return flying;
	}

	this.hits = function(target)
	{
		var hitbox = target.getHitbox(),
			right = {x: x, y: y},
			left = {
				x: x - (8 * scale * Math.cos(rotation)),
				y: y - (8 * scale * Math.sin(rotation))
			};
		
		var test =
			right.x >= hitbox.left &&
			left.x <= hitbox.right &&
			right.y >= hitbox.top &&
			left.y <= hitbox.bottom;

		return test;
	}
}