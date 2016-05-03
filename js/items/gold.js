

function Gold(x,y) {
	console.log("gold constructor");
	Item.call(this, x, y, 'G');
}


Gold.prototype = Item;


Gold.prototype.collide =function(player, dungeon) {
		player.addToInventory(this);

		dungeon.removeItem(this);
};
		
