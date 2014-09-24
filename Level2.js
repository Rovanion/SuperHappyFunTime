Level2 = function() {};

Level2.prototype = new Level(1600, 600);

Level2.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);
	this.addPlatform(600, this.world.height - 100, 400, 10);

};