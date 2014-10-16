Character = function(gameState) {
	this.gameState = gameState;
};

Character.prototype = {
	GRAVITY: 900,
	ACCELERATION: 50,
	JUMP_ACCELERATION: -350,
	MAX_SPEED: 350,
	MAX_SPEED_PULLING: 600,
	turnedRight: false,
	jumping: true,
	panoramaview: true,

	preload: function() {
		this.gameState.load.spritesheet('torso',
			'assets/character_spritesheet_body.png', 40, 40);
		this.gameState.load.spritesheet('legs',
			'assets/character_spritesheet_legs.png', 40, 19);

		this.hookShot = new HookShot(this.gameState);
		this.hookShot.preload();
	},

	/**
	 * The initial position of the Character in world coordinates x, y.
	 */
	create: function(x, y) {
		this.legs = this.gameState.add.sprite(x, y, 'legs');
		this.torso = this.gameState.add.sprite(x, y, 'torso');
		// Whether or not the head is rotating to indicate a cooldown.
		this.torso.rotating = false;

		this.gameState.physics.arcade.enable(this.torso);
		this.gameState.physics.arcade.enable(this.legs);

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

		this.hookShot.create(this.torso);
	},

	update: function() {
		// Do physics-y things first
		this.gameState.physics.arcade.collide(this.torso,
			this.gameState.layer);

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

		if (this.torso.body.blocked.down) {
			this.torso.body.velocity.x += accel;
		}
		else {
			this.torso.body.velocity.x += accel / 2;
		}

		// Enforce the max speed
		if (!this.hookShot.pulling)
			var speed = this.MAX_SPEED;
		else
			var speed = this.MAX_SPEED_PULLING;

		if (this.torso.body.velocity.x >= speed) {
			this.torso.body.velocity.x = speed;
		}
		else if (this.torso.body.velocity.x <= -speed) {
			this.torso.body.velocity.x = -speed;
		}
		if (this.torso.body.velocity.y <= -speed) {
			this.torso.body.velocity.y = -speed;
		}

		// Avoid nasty errors.
		if (isNaN(this.torso.body.velocity.x)) {
			this.torso.body.velocity.x = 0;
		}

		// Slow down bobby if he's touching any surface.
		if (this.torso.body.blocked.down || this.torso.body.blocked.up
				|| this.torso.body.blocked.left || this.torso.body.blocked.right) {
			if (!cursors.left.isDown && !cursors.right.isDown) {
				this.torso.body.velocity.x -= this.torso.body.velocity.x / 6;
			}
		}

		if(this.torso.body.blocked.down){
			// Landing animation, note that this must be before the jump
			// function.
			if (this.jumping) {
				this.jumping = false;
				if (this.torso.body.velocity.x > 0)
					this.torso.animations.play('landRight');
				else
					this.torso.animations.play('landLeft');
			}

			// Jump bobby, jump!
			if (cursors.up.isDown) {
				this.jumping = true;
				this.turnedWhileJumping = false;
				this.torso.body.velocity.y = this.JUMP_ACCELERATION;
				if (this.torso.body.velocity.x > 0)
					this.torso.animations.play('jumpRight');
				else
					this.torso.animations.play('jumpLeft');
			}
		}

		var angle = -game.physics.arcade.angleToPointer(this.torso) + Math.PI / 2;
		// Shoot on mouseDown, cancel on mouseUp
		if (game.input.activePointer.isDown){
			this.hookShot.shoot(
				this.torso.x + 10 * Math.sin(angle),
				this.torso.y + 10 * Math.cos(angle),
				game.physics.arcade.angleToPointer(this.torso)
			);
			// To lock the head from following the mouse.
			this.torso.rotating = true;
		}
		else if (game.input.activePointer.isUp && this.hookShot.shooting || this.hookShot.pulling){
			this.hookShot.cancelHook();
		}

		// So don't ask me exactly why I add π / 2 here, I just do.
		angle += Math.PI / 2;

		if(!this.torso.rotating){
			if (angle > Math.PI * 3 / 2 || angle < Math.PI / 2) {
				this.torso.animations.frame = 0;
				this.torso.rotation = -angle;
			} else {
				this.torso.animations.frame = 1;
				this.torso.rotation = -angle - Math.PI;
			}
		}

		this.legs.body.y = this.torso.body.y + 29;
		this.legs.body.x = this.torso.body.x;
	},

	characterOutsideWorld : function() {
		//game.state.restart(game.state.current);
	},

	enableGravity: function() {
		this.torso.body.gravity.y = this.GRAVITY;
	}
};
