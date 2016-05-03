var Player = function(x, y) {
	this.AVATAR = "@";
	this.color = "#0f0";
	this.posX = x;
	this.posY = y; 
	this.inventory = [];
};

Player.prototype.render = function(display, viewport) {
	display.draw(this.posX - viewport.x, this.posY - viewport.y, this.AVATAR, this.color);
};

Player.prototype.addToInventory = function(item){
	this.inventory.push(item);
};

Player.prototype.score = function() {
	return String(this.inventory.length);
}