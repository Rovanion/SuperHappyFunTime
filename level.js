Level = function(gameplaystate) {
	this.gameplaystate = gameplaystate;
	this.resetData();
};

Level.prototype = {

	preload: function() {
		this.gameplaystate.load.image('background', 'assets/background.png');
		this.gameplaystate.load.image('platform', 'assets/platform.png');
	},

	create: function() {
		this.gameplaystate.add.tileSprite(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT, 'background');

		this.gameplaystate.world.setBounds(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT);

		this.platforms = this.gameplaystate.add.group();
		this.platforms.enableBody = true;

		var floor = this.platforms.create(0, this.gameplaystate.world.height - 64, 'platform');
		floor.scale.setTo(2, 2);
		floor.body.immovable = true;
	},

	resetData: function() {
		this.platforms = null;
		this.floor = null;

		this.LEVEL_WIDTH = 1600;
		this.LEVEL_HEIGHT = 400;
	}
};
