Level = function() {
	this.platforms = null;
	this.floor = null;

	this.LEVEL_WIDTH = 1600;
	this.LEVEL_HEIGHT = 600;
}

Level.prototype = {

preload: function() {
		 game.load.image('background', 'assets/background.png');
		 game.load.image('platform', 'assets/platform.png');
	 },

create: function() {
		game.add.tileSprite(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT, 'background');

		game.world.setBounds(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT);

		this.platforms = game.add.group();
		this.platforms.enableBody = true;

		var floor = this.platforms.create(0, game.world.height - 64, 'platform');
		floor.scale.setTo(2, 2);
		floor.body.immovable = true;
	}
};
