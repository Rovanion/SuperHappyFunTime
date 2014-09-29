Character = function(gameplaystate) {
	this.gameplaystate = gameplaystate;
};

Character.prototype = {

	preload: function() {
		this.gameplaystate.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);

		this.INITIAL_POSITION_X = 32;
		this.INITIAL_POSITION_Y = 0;
		this.GRAVITY = 500;
		this.ACCELERATION = 50;
		this.JUMP_ACCELERATION = -250;
		this.MAX_SPEED = 500;
		this.hookShot = new HookShot(this.gameplaystate, this);
		this.hookShot.preload();
	},

	create: function() {
		this.resetData();

		this.sprite = this.gameplaystate.add.sprite(this.INITIAL_POSITION_X, this.INITIAL_POSITION_Y, 'character');
		this.gameplaystate.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = this.GRAVITY;
		this.sprite.anchor.setTo(0.5, 0.5);

		// Define the animations
		this.sprite.animations.add('left', [0, 1, 2, 3], 15);
		this.sprite.animations.add('right', [5, 6, 7, 4], 15);
		this.sprite.animations.add('jumpLeft', [2], 10);
		this.sprite.animations.add('jumpRight', [7], 10);
		this.sprite.animations.add('landLeft', [1], 10);
		this.sprite.animations.add('landRight', [6], 10);

		this.cursors = this.gameplaystate.input.keyboard.createCursorKeys();

		this.gameplaystate.camera.follow(this.sprite);

		this.rope = new Phaser.Line(this.sprite.position.x, this.sprite.position.y, this.sprite.position.x, this.sprite.position.y);

		this.sprite.checkWorldBounds = true;
		this.sprite.events.onOutOfBounds.add(this.characterOutsideWorld);

		this.hookShot.create();
	},

	update: function() {
		// Do physics-y things first
		this.gameplaystate.physics.arcade.collide(this.sprite, this.gameplaystate.platforms);
		this.hookShot.update();

		// Walk left and right
		var accel = 0;
		if (this.cursors.right.isDown){
			accel = this.ACCELERATION;
			this.sprite.animations.play('right');
			this.turnedRight = true;
		}
		else if (this.cursors.left.isDown){
			accel = -this.ACCELERATION;
			this.sprite.animations.play('left');
			this.turnedRight = false;
		}

		if(this.sprite.body.touching.down)
			this.sprite.body.velocity.x += accel;
		else
			this.sprite.body.velocity.x += accel / 2;

		// Enforce the max speed
		if(this.sprite.body.velocity.x >= this.MAX_SPEED)
			this.sprite.body.velocity.x = this.MAX_SPEED;
		else if(this.sprite.body.velocity.x <= -this.MAX_SPEED)
			this.sprite.body.velocity.x = -this.MAX_SPEED;

		if(this.sprite.body.touching.down){
			if(isNaN(this.sprite.body.velocity.x))
				this.sprite.body.velocity.x = 0;

			// Stop bobby if he's on the ground and the user doesn't want him to move.
			if(! this.cursors.left.isDown && ! this.cursors.right.isDown)
				this.sprite.body.velocity.x -= this.sprite.body.velocity.x / 5;

			// Landing animation, note that this must be before the jump function.
			if(this.jumping){
				this.jumping = false;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('landRight');
				else
					this.sprite.animations.play('landLeft');
			}

			// Jump bobby, jump!
			if (this.cursors.up.isDown) {
				this.jumping = true;
				this.turnedWhileJumping = false;
				this.sprite.body.velocity.y = this.JUMP_ACCELERATION;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('jumpRight');
				else
					this.sprite.animations.play('jumpLeft');
			}
		}

		// A guide between bobby and the mouse
		if (this.turnedRight)
			this.rope.start.set(this.sprite.position.x + 55, this.sprite.position.y);
		else
			this.rope.start.set(this.sprite.position.x + 10, this.sprite.position.y);
		this.rope.end.set(this.gameplaystate.input.mousePointer.worldX, this.gameplaystate.input.mousePointer.worldY);


		// Fire ze hookshot!
		if(game.input.activePointer.isDown)
			this.hookShot.shoot();
	},

	render: function() {
		game.debug.geom(this.rope, '#4c4c33');
	},

	resetData: function() {
		// Jag är osäker på om vi vill sätta sprite osv. till null här. Gör inte det att bobbys sprite försvinner när vi resattar?
		this.sprite = null;
		this.cursors = null;
		this.rope = null;
		this.turnedRight = false;
		this.jumping = true;

	},

	characterOutsideWorld: function() {
		game.state.restart(game.state.current);
	}

};
