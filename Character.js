Character = function(gameState) {
	this.gameState = gameState;
};

Character.prototype = {

	preload : function() {
		this.gameState.load.spritesheet('torso',
			'assets/character_spritesheet_body.png', 64, 64);
		this.gameState.load.spritesheet('legs',
			'assets/character_spritesheet_legs.png', 64, 30);

		this.GRAVITY = 800;
		this.ACCELERATION = 50;
		this.JUMP_ACCELERATION = -350;
		this.MAX_SPEED = 500;
		this.hookShot = new HookShot(this.gameState, this.torso);
		this.hookShot.preload();
	},

	/**
	 * The initial position of the Character in world coordinates.
	 */
	 create : function(x, y) {
	 	this.resetData();

	 	this.legs = this.gameState.add.sprite(x, y, 'legs');
	 	this.torso = this.gameState.add.sprite(x, y, 'torso');

	 	this.gameState.physics.arcade.enable(this.torso);
	 	this.gameState.physics.arcade.enable(this.legs);

	 	this.legs.body.gravity.y = this.GRAVITY;

	 	this.torso.anchor.setTo(0.5, 0.5);
	 	this.legs.anchor.setTo(0.5, 0.5);

		// Define the animations
		this.legs.animations.add('left', [ 0, 1, 2, 3 ], 15);
		this.legs.animations.add('right', [ 5, 6, 7, 4 ], 15);
		this.legs.animations.add('jumpLeft', [ 2 ], 10);
		this.legs.animations.add('jumpRight', [ 7 ], 10);
		this.legs.animations.add('landLeft', [ 1 ], 10);
		this.legs.animations.add('landRight', [ 6 ], 10);
		this.torso.animations.add('left', [ 0 ], 10);
		this.torso.animations.add('right', [ 1 ], 10);

		this.cursors = this.gameState.input.keyboard.createCursorKeys();

		this.torso.checkWorldBounds = true;
		this.torso.events.onOutOfBounds.add(this.characterOutsideWorld);

		this.hookShot.create();
	},

	update : function() {
		// Do physics-y things first
		this.gameState.physics.arcade.collide(this.torso,
			this.gameState.platforms);

		this.hookShot.update();

		// Walk left and right
		var accel = 0;
		if (cursors.right.isDown) {
			accel = this.ACCELERATION;
			this.legs.animations.play('right');
			this.turnedRight = true;
		} else if (cursors.left.isDown) {
			accel = -this.ACCELERATION;
			this.legs.animations.play('left');
			this.turnedRight = false;
		}

		if (this.legs.body.touching.down) {
			this.legs.body.velocity.x += accel;
		}
		else {
			this.legs.body.velocity.x += accel / 2;
		}

		// Enforce the max speed
		if (this.legs.body.velocity.x >= this.MAX_SPEED) {
			this.legs.body.velocity.x = this.MAX_SPEED;
		}
		else if (this.legs.body.velocity.x <= -this.MAX_SPEED) {
			this.legs.body.velocity.x = -this.MAX_SPEED;
		}
		if (this.legs.body.velocity.y <= -this.MAX_SPEED) {
			this.legs.body.velocity.y = -this.MAX_SPEED;
		}


		if (this.legs.body.touching.down) {
			if (isNaN(this.legs.body.velocity.x)) {
				this.legs.body.velocity.x = 0;
			}

			// Stop bobby if he's on the ground and the user doesn't want him to
			// move.
			if (!cursors.left.isDown && !cursors.right.isDown) {
				this.legs.body.velocity.x -= this.legs.body.velocity.x / 5;
			}

			// Landing animation, note that this must be before the jump
			// function.
			if (this.jumping) {
				this.jumping = false;
				if (this.legs.body.velocity.x > 0)
					this.legs.animations.play('landRight');
				else
					this.legs.animations.play('landLeft');
			}

			// Jump bobby, jump!
			if (cursors.up.isDown) {
				this.jumping = true;
				this.turnedWhileJumping = false;
				this.legs.body.velocity.y = this.JUMP_ACCELERATION;
				if (this.legs.body.velocity.x > 0)
					this.legs.animations.play('jumpRight');
				else
					this.legs.animations.play('jumpLeft');
			}
		}

		// Shoot on mouseDown, cancel on mouseUp
		if (game.input.activePointer.isDown)
			this.hookShot.shoot();
		else if (game.input.activePointer.isUp && this.hookShot.shooting || this.hookShot.pulling)
			this.hookShot.cancelHook();

		var angle = Phaser.Math.radToDeg(game.physics.arcade
			.angleToPointer(this.torso));
		if (angle > 90 || angle < -90) {
			this.torso.animations.frame = 0;
			this.torso.angle = 180 + angle;
		} else {
			this.torso.animations.frame = 1;
			this.torso.angle = angle;
		}


		this.torso.body.y = this.legs.body.y-45;
		this.torso.body.x = this.legs.body.x;

	},

	render : function() {
	},

	resetData : function() {
		// Jag är osäker på om vi vill sätta sprite osv. till null här. Gör inte
		// det att bobbys sprite försvinner när vi resattar?
		this.torso = null;
		this.legs = null;
		this.cursors = null;
		this.turnedRight = false;
		this.jumping = true;

	},

	characterOutsideWorld : function() {
		game.state.restart(game.state.current);
	}

};
