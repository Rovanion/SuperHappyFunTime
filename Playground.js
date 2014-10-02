/**
 * This level contains a playing field for the developers,
 * it is not indended for use in the final game, it should merely
 * contain all objocts used in the game.
 */

Playground = function() {};

Playground.prototype = new Level(1600, 600);

Playground.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 350, 64);
	this.addPlatform(300, 300, 800, 64);
	this.addPlatform(600, this.world.height - 64, 400, 64);
};
