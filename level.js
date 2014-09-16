Level = function(game) {
	this.game = game;
	this.platforms = null;
	this.floor = null;

	this.LEVEL_WIDTH = 1600;
	this.LEVEL_HEIGHT = 600;
}

Level.prototype = {

preload: function() {
		 this.game.load.image('background', 'assets/background.png');
		 this.game.load.image('platform', 'assets/platform.png');
	 },

create: function() {	
		this.game.add.tileSprite(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT, 'background');

		this.game.world.setBounds(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT);

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		var floor = this.platforms.create(0, this.game.world.height - 64, 'platform');
		floor.scale.setTo(2, 2);
		floor.body.immovable = true;	
	}
};
