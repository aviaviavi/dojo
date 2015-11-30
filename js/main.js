var display;
var mazeWidth = 300;
var mazeHeight = 300;
var viewportWidth = 30;
var viewportHeight = 20;
var player;
var dungeon;


$(function() {
	ROT.RNG.setSeed(1234);

	dungeon = new Dungeon(mazeWidth, mazeHeight, viewportWidth, viewportHeight);

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

	render();

});

function render() {

	dungeon.centerViewport(player.posX, player.posY);
	dungeon.render(display);

	player.render(display, dungeon.viewport);
}

function bindEvents() {
	$(document).on('keyup', function (e) {
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
	if (reRender) {
		render();
	}
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

