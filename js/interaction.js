// Handles user interaction
function Interaction(game)
{
	var canvas = game.canvas;
	var line = null;
	var lastLine = null;

	var ctx = canvas.getContext("2d");
	var canvasOffset = getOffset(canvas);
	var offsetX = canvasOffset.x;
	var offsetY = canvasOffset.y;

	this.draw = function()
	{
		if (line) {
			drawLine(line, _config.interaction.lineColor);
		}
		if (lastLine) {
			drawLine(lastLine, _config.interaction.lastLineColor);
		}
	}

	function drawLine(l, color)
	{
		ctx.lineWidth = _config.interaction.lineWidth;
		ctx.beginPath();
		ctx.moveTo(l.x1, l.y1);
		ctx.lineTo(l.x2, l.y2);
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	// Init listeners
	canvas.addEventListener('mousedown', function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		line = {
			x1: getXOffset(e.clientX),
			y1: getYOffset(e.clientY),
			x2: getXOffset(e.clientX),
			y2: getYOffset(e.clientY)
		};
		console.log(line);
	}, false);

	canvas.addEventListener('mousemove', function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		if (line) {
			line.x2 = getXOffset(e.clientX);
			line.y2 = getYOffset(e.clientY);

			correctForMaxLength();
		}
	}, false);

	canvas.addEventListener('mouseup', function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		lastLine = line;
		line = null;
	}, false);

	function getXOffset(x)
	{
		return parseInt(x - offsetX);
	}

	function getYOffset(y)
	{
		return parseInt(y - offsetY);
	}

	function getOffset(element) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while (element) {
	        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
	        element = element.offsetParent;
	    }
	    return { x: xPosition, y: yPosition };
	}

	function correctForMaxLength()
	{
		// Pythagoras this shit up
		var a = Math.abs(line.x1 - line.x2),
			b = Math.abs(line.y1 - line.y2),
			c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

		if (c > _config.interaction.maxLength) {

			var angle = Math.acos(a / c),
				maxA = _config.interaction.maxLength * Math.cos(angle),
				maxB = _config.interaction.maxLength * Math.sin(angle);

			line.x2 = line.x1 + (maxA * ((line.x2 - line.x1) / a));
			line.y2 = line.y1 + (maxB * ((line.y2 - line.y1) / b));
		}
	}
}
