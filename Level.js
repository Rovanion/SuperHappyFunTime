Level = function (csvfile, characterStartX, characterStartY, goalX, goalY) {
	this.csvfile = csvfile;
	this.characterStartX = characterStartX;
	this.characterStartY = characterStartY;
	this.goalX = goalX;
	this.goalY = goalY;
};

Level.prototype = {

	preload: function() {
		this.load.image('background', 'assets/background.png');

		this.load.tilemap('map', this.csvfile, null, Phaser.Tilemap.CSV);
		this.load.image('tilemap', 'assets/platformblock.png');

		this.load.image('goal', 'assets/candy.png');

		this.bobby = new Character(this);
		bobby = this.bobby;
		this.bobby.preload(this.characterStartX, this.characterStartY);

		this.timer = new Timer(this);
		this.timer.preload();
	},

	create: function() {
		var map = game.add.tilemap('map', 40, 40);

		currentLevel = this.levelStateName;
		nextLevel = this.nextLevelStateName;

		map.addTilesetImage('tilemap');

		this.physics.startSystem(Phaser.Physics.Arcade);

		// Sets the size of the world depending on the size of the map
		this.add.tileSprite(0, 0, map.widthInPixels, map.heightInPixels, 'background');
		this.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		this.layer = map.createLayer(0);

		// Objects can collide with the tile
		map.setCollisionBetween(0, 0);

		this.bobby.create(this.characterStartX, this.characterStartY);
		this.timer.create();

		this.goal = this.add.sprite(this.goalX, this.goalY, 'goal');
		this.goal.anchor.setTo(0.5, 0.5);
		this.physics.arcade.enable(this.goal);

		// Register hooks for the number keys to switch between levels.
		keynames = [ "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX",
		"SEVEN", "EIGHT", "NINE", "TEN", "ZERO" ];
		for ( var n = 1; n <= 10; n++){
			// The extra anonymous function here exists because of:
			switchLevel = ( function(n) { return function () { game.state.start(n); } } )(n);
			// Equivelant of this.input.keyboard.addKey(49,50, .. ,58)
			this.input.keyboard.addKey(Phaser.Keyboard[keynames[n]]).onDown.add(switchLevel);
		}
	},

	update: function() {
		this.bobby.update();
		this.physics.arcade.collide(this.bobby.torso, this.goal, this.goalReached);
	},

	goalReached: function() {
		game.state.start('betweenLevels', true, false);
	}

};
