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
	// Whether or not the timer is enabled. Disabled for demo scenes.
	timerEnabled: true,
	// Whether or not user input is enabled. Disabled for demo scenes.
	inputEnabled: true,
	cameraFollowsBobby: true,

	preload: function() {
		this.load.image('background', 'assets/background.png');
		this.load.image('goal', 'assets/candy.png');
		this.load.image('tilemap', 'assets/tilemap.png');
		this.load.image('sawblade', 'assets/saw_blade.png');
		this.load.tilemap('map', this.csvfile, null, Phaser.Tilemap.CSV);

		this.bobby = new Character(this);
		this.bobby.preload(this.characterStartX, this.characterStartY);
		bobby = this.bobby;

		if(this.timerEnabled){
			this.timer = new Timer(this);
			this.timer.preload();
		}

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
		if(this.timerEnabled)
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
			this.bobby.update(this.inputEnabled);
			this.physics.arcade.overlap(this.bobby.torso, this.goal, this.goalReached);
			this.physics.arcade.overlap(this.bobby.torso, this.sawBlades, this.killed, null, this);
		}
		if (this.restartTimer)
			this.time.events.add(Phaser.Timer.SECOND * 2, this.restart, this);
		if(!this.bobby.torso.alive)
			this.physics.arcade.collide(this.bobby.meat, this.ground);
	},

	goalReached: function() {
		game.state.start('betweenLevels', true, false);
	},

	/**
	 * When the pan view is completed bobbys update function starts running and the camera is set to follow bobby again.
	 */
	panCompleted: function() {
		this.bobby.enableGravity();
		this.panFinished = true;
		if(this.timerEnabled)
			this.timer.started = true;
		if(this.cameraFollowsBobby){
			this.camera.follow(this.bobby.torso);
			this.bobby.enableCheckWorldBounds();
		}
	},

	/**
	 * Adds a sawblade to the level.
	 */
	addSawBlade: function(positionX, positionY) {
		var sawBlade = this.add.sprite(positionX, positionY, 'sawblade');
		sawBlade.anchor.setTo(0.5, 0.5);
		this.sawBlades.add(sawBlade);
		sawBlade.body.setSize(60, 60, 5, 5);
		sawBlade.body.angularVelocity = 100 + Math.random() * 300;
	},

	/**
	 * Adds a sawblade which is moving between two points
	 */
	addMovingSawBlade: function(startPositionx, startPositiony, endPositionx, endPositiony) {
		var sawBlade = this.add.sprite(startPositionx, startPositiony, 'sawblade');
		sawBlade.anchor.setTo(0.5, 0.5);
		this.tweens.create(sawBlade).from({
			x: endPositionx,
			y: endPositiony
		}, 1500, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
		this.sawBlades.add(sawBlade);
		sawBlade.body.setSize(60, 60, 5, 5);
		sawBlade.body.angularVelocity = 100 + Math.random() * 300;
	},

	killed: function() {
		// Pause bobby
		this.panFinished = false;
		this.bobby.blood();
		this.restartTimer = true;
	},

	restart: function() {
		this.restartTimer = false;
		game.state.restart(game.state.current);
	}

};
