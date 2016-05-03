var display;
var mazeWidth = 300;
var mazeHeight = 300;
var viewportWidth = 30;
var viewportHeight = 20;
var player;
var dungeon;
var items;

$(function() {
	ROT.RNG.setSeed(1234);

	dungeon = new Dungeon(mazeWidth, mazeHeight, viewportWidth, viewportHeight);

	// items
	items = createTestItems();
	$.each(items, function(index, item) {
		dungeon.addItem(item);
	});

	display = new ROT.Display({
		width: viewportWidth,
		height: viewportHeight,
		fontSize: 24,
		spacing: 1
	});
	$("body").append(display.getContainer());

	// place player
	var room = dungeon.map.getRooms().random();
	var center = room.getCenter();
	player = new Player(center[0], center[1]);

	bindEvents();

	turn();

});

function createTestItems() {
	var items = [];
	// iterate through rooms, placing a test item per room
	var rooms = dungeon.map.getRooms();
	for (var i=0; i < rooms.length; i++) {
		var room = rooms[i];
		var x = Math.floor(Math.random() * (room.getRight() - room.getLeft()) + room.getLeft());
		var y = Math.floor(Math.random() * (room.getBottom() - room.getTop()) + room.getTop());
		items.push(new Gold(x, y));
	}
	return items;
}

function render() {

	dungeon.centerViewport(player.posX, player.posY);
	dungeon.render(display);
	player.render(display, dungeon.viewport);
	display.drawText(5,  2, player.score());
}

function bindEvents() {
	$(document).on('keydown', function (e) {
		var code = e.keyCode;
		var vk = "?";
		for (var name in ROT) {
			if (ROT[name] == code && name.indexOf("VK_") == 0) {
				vk = name;
			}
		}

		handleKeyPress(vk);
	});
}

function handleKeyPress(key) {
	var reRender = false;
	switch (key) {
		case "VK_UP":
			reRender = moveRelative(0, -1);
			break;
		case "VK_DOWN":
			reRender = moveRelative(0, 1);
			break;
		case "VK_LEFT":
			reRender = moveRelative(-1, 0);
			break;
		case "VK_RIGHT":
			reRender = moveRelative(1, 0);
			break;
		default:
			break;
	}
	turn();
}

function turn() {
	dungeon.calculateFov(player.posX, player.posY);

	processEvents();
	render();
}

function processEvents() {
	// collision detection
	$.each(items, function(idx, item) {
		if (item == null) {
			return;
		}
		if (player.posX === item.posX && player.posY === item.posY) {
			item.collide(player, dungeon);
		}
	});
}

// If the player can move, move them.  Return true if moved, false if not.
function moveRelative(x, y) {
	var newX = player.posX + x;
	var newY = player.posY + y;
	if (!dungeon.isWall(newX, newY)) {
		player.posX = newX;
		player.posY = newY;
		return true;
	}
	return false;
}

