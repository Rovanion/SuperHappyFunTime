Level2 = function() {
	Phaser.State.call(this, game);
};

Level2.prototype = {
	preload: function() {
		this.loadLevelAssets();

		this.LEVEL_WIDTH = 1600;
		this.LEVEL_HEIGHT = 600;

		this.bobby = new Character(this);
		this.bobby.preload();
	},

	create: function() {
		this.physics.startSystem(Phaser.Physics.P2JS);

		this.resetData();
		
		this.add.tileSprite(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT, 'background');

		this.world.setBounds(0, 0, this.LEVEL_WIDTH, this.LEVEL_HEIGHT);

		this.loadLevelObjects();
		this.bobby.create();

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

	loadLevelAssets: function() {
		this.load.image('background', 'assets/background.png');
		this.load.image('platform', 'assets/platform.png');
	},

	loadLevelObjects: function() {
		
		this.platforms = this.add.group();
		this.platforms.enableBody = true;

		var floor = this.platforms.create(0, this.world.height - 64, 'platform');
		floor.scale.setTo(2, 2);
		floor.body.immovable = true;
		
		var platform1 = this.platforms.create(600, this.world.height - 100, 'platform');
		platform1.body.immovable = true;
	},

	resetData: function() {
		this.cursors = null;
		this.platforms = null;
		this.floor = null;
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