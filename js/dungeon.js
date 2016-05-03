
var Viewport = function(viewportWidth, viewportHeight) {
	this.width = viewportWidth;
	this.height = viewportHeight;
	this.x = 0;
	this.y = 0;

};

var Dungeon = function(dungeonWidth, dungeonHeight, viewportWidth, viewportHeight) {

	this.WALL = "#";
	this.EMPTY = ".";
	this.fovRadius = 3;

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

	// Don't allow see-through walls, so if the character is a wall
	// block the light/visibility
	var dungeon = this;
	var lightPasses = function(x, y) {
		if (dungeon.level[x][y] == dungeon.WALL) {
			return false;
		}
		return true;
	};

	this.fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

};

Dungeon.prototype.addItem = function(item) {
	this.level[item.posX][item.posY] = {
		type: item.avatar,
		visible: false,
		item: item
	}
};

Dungeon.prototype.removeItem = function(item){
	console.log('nulling!');
	this.level[item.posX][item.posY].item = null;
	this.level[item.posX][item.posY].type = this.EMPTY;

	items.splice(items.indexOf(item), 1);

};

Dungeon.prototype.render = function(display) {
	for (var x = 0; x < this.viewport.width; x++) {
		for (var y=0; y < this.viewport.height; y++) {
			var rendX = x + this.viewport.x;
			var rendY = y + this.viewport.y;
			var block = this.level[rendX][rendY];
			var renderCharacter = block.type;
			if (!block.visible) {
				renderCharacter = ' ';
			}
			if(block.item) {
				display.draw(x, y, renderCharacter, block.item.color);
			}
			else {
				display.draw(x, y, renderCharacter);

			}
		}
	}

};

Dungeon.prototype.calculateFov = function(playerX, playerY) {
	/* output callback */
	this.fov.compute(playerX, playerY, this.fovRadius, function(x, y, r, visibility) {
		this.level[x][y].visible = true;
	}.bind(this));
};

Dungeon.prototype.isWall = function(x, y) {
	return (this.level[x][y].type === this.WALL);
};

Dungeon.prototype.centerViewport = function(x, y) {
	this.viewport.x = x - this.viewport.width / 2;
	this.viewport.y = y - this.viewport.height / 2;
};

Dungeon.prototype.setFovRadius = function(r) {
	this.fovRadius = r;
};