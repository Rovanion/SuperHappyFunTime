Level = function(width, height) {
	this.LEVEL_WIDTH = width;
	this.LEVEL_HEIGHT = height;
};

Level.prototype = {
	preload: function() {
		this.loadAssets();

		this.bobby = new Character(this);
		this.bobby.preload();
	},

	create: function() {
		this.physics.startSystem(Phaser.Physics.P2JS);

		this.resetData();
		
		this.add.tileSprite(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT, 'background');

		this.world.setBounds(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT);

		this.platforms = this.add.group();
		this.platforms.enableBody = true;

		this.loadLevelObjects();

		this.bobby.create();

		// Switch levels with number keys
		this.levelOneKey = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.levelTwoKey = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.levelOneKey.onDown.add(this.switchToLevelOne);
		this.levelTwoKey.onDown.add(this.switchToLevelTwo);
	},

	update: function() {
		this.physics.arcade.collide(this.bobby.sprite, this.platforms);
		this.bobby.update();

	},

	render: function() {
		this.bobby.render();
	},

	loadAssets: function() {
		this.load.image('background', 'assets/background.png');
		this.load.image('platform', 'assets/platform.png');
	},

	resetData: function() {
		this.cursors = null;
		this.platforms = null;
		this.floor = null;
	},

	addPlatform: function(positionx, positiony, width, height) {
		var platform = this.platforms.create(positionx, positiony, 'platform');
		platform.scale.setTo(width/400, height/32);
		platform.body.immovable = true;
	},

	switchToLevelOne: function() {
		var state = new Level1();
		game.state.add('level1', state);
		game.state.start("level1");
	},

	switchToLevelTwo: function() {
		var state = new Level2();
		game.state.add('level2', state);
		game.state.start("level2");
	}
};
