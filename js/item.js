
var Item = function(x, y, avatar, color) {
	console.log("item constructor");
	this.avatar = avatar;
	this.color = color || "red";
	this.posX = x;
	this.posY = y; 
};

Item.prototype.render = function(display, viewport) {
	display.draw(this.posX - viewport.x, this.posY - viewport.y, this.avatar, this.color);
};

// When the player moves on top of the item, this is the callback
Item.prototype.collide = function(player, dungeon) {
	console.error("collide not defined for ", this);
};
