/**
 * This level introduces the player to the concept of falling
 * and reaching a goal.
 */

Falling = function() {};

Falling.prototype = new Level(1600, 600);

Falling.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);
	this.addPlatform(600, this.world.height - 100, 400, 10);

};
