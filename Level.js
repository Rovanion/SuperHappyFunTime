Level = function (csvfile, characterStartX, characterStartY, goalX, goalY) {
	this.csvfile = csvfile;
	this.characterStartX = characterStartX;
	this.characterStartY = characterStartY;
	this.goalX = goalX;
	this.goalY = goalY;
};

Level.prototype = {
	// Whether or not to play the pan over the map.
	firstTimeRun: true,
	// Whether the camera is panning over the map, showing it to the player.
	panFinished: false,

	preload: function() {
		this.load.image('background', 'assets/background.png');
		this.load.image('goal', 'assets/candy.png');
		this.load.image('tilemap', 'assets/tilemap.png');
		this.load.tilemap('map', this.csvfile, null, Phaser.Tilemap.CSV);

		this.load.image('sawblade', 'assets/saw_blade.png');

		this.bobby = new Character(this);
		this.bobby.preload(this.characterStartX, this.characterStartY);
		bobby = this.bobby;

		this.timer = new Timer(this);
		this.timer.preload();

		this.parallax = new Parallax(this);
		this.parallax.preload();
	},

	create: function() {
		currentLevel = this.levelStateName;
		nextLevel = this.nextLevelStateName;

		this.parallax.create();
		this.map = game.add.tilemap('map', 40, 40);
		this.map.addTilesetImage('tilemap');

		this.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		// Objects can collide with tiles of the index 0 to 1.
		this.map.setCollisionBetween(0, 1);
		this.ground = this.map.createLayer(0);

		this.bobby.create(this.characterStartX, this.characterStartY);
		this.timer.create();
		this.goal = this.add.sprite(this.goalX, this.goalY, 'goal');
		this.goal.anchor.setTo(0.5, 0.5);

		this.physics.startSystem(Phaser.Physics.Arcade);
		this.physics.arcade.TILE_BIAS = 20;
		this.physics.arcade.enable(this.goal);

		this.sawBlades = this.add.group();
		this.sawBlades.enableBody = true;

		// Only pan the level the first time you run it.
		if(this.firstTimeRun) {
			// Pans the level beginning at the goal and ending at Bobby
			camera = this.camera;
			this.camera.x = this.bobby.torso.x - this.camera.view.width / 2;
			this.camera.y = this.bobby.torso.y - this.camera.view.height / 2;
			this.pan = this.tweens.create(this.camera).from({
				x: this.goal.x - this.camera.view.width / 2,
				y: this.goal.y - this.camera.view.height / 2
			}, 3000, Phaser.Easing.Quintic.InOut, true, 200);
			this.pan.onComplete.add(this.panCompleted, this);
			this.firstTimeRun = false;
		} else {
			this.panCompleted();
		}

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
		this.parallax.update();
		if (this.panFinished) {
			this.bobby.update();
			this.physics.arcade.overlap(this.bobby.torso, this.goal, this.goalReached);
			this.physics.arcade.overlap(this.bobby.torso, this.sawBlades, this.killed);
		}

		// Rotates the sawblades
		this.sawBlades.forEach(function(sawBlade) {
			sawBlade.rotation += 0.08;
   		});
	},

	goalReached: function() {
		game.state.start('betweenLevels', true, false);
	},

	/**
	 * When the pan view is completed bobbys update function starts running and the camera is set to follow bobby again.
	 */
	panCompleted: function() {
		this.bobby.enableGravity();
		this.bobby.enableCheckWorldBounds();
		this.panFinished = true;
		this.timer.started = true;
		this.camera.follow(this.bobby.torso);
	},

	/**
	 * Adds a sawblade to the level.
	 */
	addSawBlade: function(positionX, positionY) {
		var sawBlade = this.add.sprite(this.sawBlades.x + positionX, this.sawBlades.y + positionY, 'sawblade');
		sawBlade.anchor.setTo(0.5, 0.5);
		this.sawBlades.add(sawBlade);
		sawBlade.body.setSize(50, 50, 10, 10);
	},

	killed: function() {
		game.state.restart(game.state.current);
	}

};
