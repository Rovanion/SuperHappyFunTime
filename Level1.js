Level1 = function() {};

Level1.prototype = new Level();

Level1.prototype.loadLevelObjects = function() {

	this.platforms = this.add.group();
	this.platforms.enableBody = true;

	var floor = this.platforms.create(0, this.world.height - 64, 'platform');
	floor.scale.setTo(2, 2);
	floor.body.immovable = true;	
};
