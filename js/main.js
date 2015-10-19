var display;
var mazeWidth = 100;
var mazeHeight = 20;
var playerX;
var playerY;

var level = Array.matrix(mazeWidth, mazeHeight, {});

$(function() {
	ROT.RNG.setSeed(1234);
	var map = new ROT.Map.Digger(mazeWidth, mazeHeight, {
		dugPercentage: 0.2
	});
	display = new ROT.Display({width:mazeWidth, height:mazeHeight});
	$("body").append(display.getContainer());

	map.create(testMazeCallback);

	// place player
	var room = map.getRooms().random();
	var center = room.getCenter();
	playerX = center[0];
	playerY = center[1];

	bindEvents();

	render();



});

function testMazeCallback(x, y, wall) {
	level[x][y] = {
		type: wall ? "#" : ".",
		visible: false
	};
}

function render() {
	for (var x = 0; x < mazeWidth; x++) {
		for (var y=0; y < mazeHeight; y++) {
			display.draw(x, y, level[x][y].type);
		}
	}
	display.draw(playerX, playerY, "@", "#0f0");
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
	switch (key) {
		case "VK_UP":
			playerY--;
			break;
		case "VK_DOWN":
			playerY++;
			break;
		case "VK_LEFT":
			playerX--;
			break;
		case "VK_RIGHT":
			playerX++;
			break;
		default:
			break;
	}
	render();
}
