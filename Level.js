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

		// Register hooks for the number keys to switch between levels.
		keynames = [ "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX",
								 "SEVEN", "EIGHT", "NINE", "TEN", "ZERO" ];
		for ( var n = 1; n <= 10; n++){
			// The extra anonymous function here exists because of:
			// http://www.mennovanslooten.nl/blog/post/62
			switchLevel = ( function(n) { return function () { game.state.start(n); } } )(n);
			// Equivelant of this.input.keyboard.addKey(49,50, .. ,58)
			this.input.keyboard.addKey(Phaser.Keyboard[keynames[n]]).onDown.add(switchLevel);
		}
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

	addText: function(positionx, positiony, text) {
		var style = {font: "30px Arial", fill: "ffffff", align: "center"};
		this.add.text(positionx, positiony, text, style);
	}
};
