Level = function(game) {
	this.game = game;
	this.platforms = null;
	this.floor = null;
}

Level.prototype = {

preload: function() {
		 this.game.load.image('background', 'assets/background.png');
		 this.game.load.image('platform', 'assets/platform.png');
	 },

create: function() {	
		this.game.add.sprite(0, 0, 'background');

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		var floor = this.platforms.create(0, this.game.world.height - 64, 'platform');
		floor.scale.setTo(2, 2);
		floor.body.immovable = true;	
	}
};
