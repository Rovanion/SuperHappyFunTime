Level1 = function() {};

Level1.prototype = new Level(1600, 600);

Level1.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);

};
