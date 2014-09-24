Level2 = function() {};

Level2.prototype = new Level();

Level2.prototype.loadLevelObjects = function() {

	this.platforms = this.add.group();
	this.platforms.enableBody = true;

	var floor = this.platforms.create(0, this.world.height - 64, 'platform');
	floor.scale.setTo(2, 2);
	floor.body.immovable = true;

	var platform1 = this.platforms.create(600, this.world.height - 100, 'platform');
	platform1.body.immovable = true;
	

};