// Describes the player's base
var Base = function()
{
	var x = _config.base.x,
		y = _config.base.y,
		health = _config.base.maxHealth;

	this.draw = function(ctx)
	{
		ctx.lineWidth = 1;

		// Draw base
		ctx.beginPath();
		ctx.moveTo(x - 4, y);
		ctx.lineTo(x - 4, y - 40);
		ctx.lineTo(x + 4, y - 48);
		ctx.lineTo(x + 4, y - 56);
		for (var curX = x + 2; curX < x - 28; curX - 2) {
			if ((curX - x) % 4 == 0) {
				ctx.lineTo(curX, y - 56);
				ctx.lineTo(curX, y - 52);
			} else {
				ctx.lineTo(curX, y - 52);
				ctx.lineTo(curX, y - 56);
			}
		}
		ctx.lineTo(x - 28, y - 56);
		ctx.lineTo(x - 28, y - 48);
		ctx.lineTo(x - 20, y - 40);
		ctx.lineTo(x - 20, y - 36);
		ctx.lineTo(x - 100, y - 36);
		ctx.lineTo(x - 100, y);
		ctx.lineTo(x - 4, y);
		ctx.closePath();
		ctx.fillStyle = '#CCC';
		ctx.fill();

		// Draw health bar
		ctx.fillStyle = '#C00';
		ctx.fillRect(x - 40, y - 90, 50, 10);
		ctx.fillStyle = '#3C3';
		ctx.fillRect(x - 40, y - 90, health / _config.base.maxHealth * 50, 10);

	}

	this.canBeAttackedBy = function(enemy)
	{
		var hitbox = enemy.getHitbox();
		return hitbox.left <= x;
	}

	this.receiveDamage = function(damage)
	{
		health -= damage;
		if (health < 0) {
			health = 0;
		}
	}

	this.isDestroyed = function()
	{
		return health == 0;
	}

	this.revive = function()
	{
		health = _config.base.maxHealth;
	}
}