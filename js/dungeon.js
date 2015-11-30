var Viewport = function(viewportWidth, viewportHeight) {
	this.width = viewportWidth;
	this.height = viewportHeight;
	this.x = 0;
	this.y = 0;

}

var Dungeon = function(dungeonWidth, dungeonHeight, viewportWidth, viewportHeight) {

	this.WALL = "#";

	this.width = dungeonWidth;
	this.height = dungeonHeight;
	this.viewport = new Viewport(viewportWidth, viewportHeight);
	this.level = Array.matrix(mazeWidth, mazeHeight, {});

	this.map = new ROT.Map.Digger(this.width, this.height, {
		dugPercentage: 0.2
	});

	var that = this;
	this.map.create(function(x, y, wall) {
		that.level[x][y] = {
			type: wall ? that.WALL : ".",
			visible: false
		};
	});
}

Dungeon.prototype.render = function(display) {
	for (var x = 0; x < this.viewport.width; x++) {
		for (var y=0; y < this.viewport.height; y++) {
			var rendX = x + this.viewport.x;
			var rendY = y + this.viewport.y;
			display.draw(x, y, this.level[rendX][rendY].type);
		}
	}
}

Dungeon.prototype.isWall = function(x, y) {
	return (this.level[x][y].type === this.WALL);
}

Dungeon.prototype.centerViewport = function(x, y) {
	this.viewport.x = x - this.viewport.width / 2;
	this.viewport.y = y - this.viewport.height / 2;

	// TODO: check for bounds to make sure viewport doesn't extend beyond bounds
}

