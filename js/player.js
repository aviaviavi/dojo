var Player = function(x, y) {
	this.AVATAR = "@";
	this.color = "#0f0";
	this.posX = x;
	this.posY = y; 
}

Player.prototype.render = function(display, viewport) {
	display.draw(this.posX - viewport.x, this.posY - viewport.y, this.AVATAR, this.color);
}