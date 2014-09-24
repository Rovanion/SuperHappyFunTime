Character = function(gameplaystate) {
	this.gameplaystate = gameplaystate;	
	
};

Character.prototype = {

	preload: function() {
		this.gameplaystate.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);

		this.INITIAL_POSITION_X = 32;
		this.INITIAL_POSITION_Y = 0;
		this.GRAVITY = 500;
		this.ACCELERATION = 60;
		this.JUMP_ACCELERATION = -250;
	},

	create: function() {
		this.resetData();

		this.sprite = this.gameplaystate.add.sprite(this.INITIAL_POSITION_X, this.INITIAL_POSITION_Y, 'character');
		this.gameplaystate.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = this.GRAVITY;
		this.sprite.anchor.setTo(0.5, 0.5);

		// Define them animations
		this.sprite.animations.add('left', [0, 1, 2, 3], 15);
		this.sprite.animations.add('right', [5, 6, 7, 4], 15);
		this.sprite.animations.add('jumpLeft', [2], 10);
		this.sprite.animations.add('jumpRight', [7], 10);
		this.sprite.animations.add('landLeft', [1], 10);
		this.sprite.animations.add('landRight', [6], 10);

		this.cursors = this.gameplaystate.input.keyboard.createCursorKeys();

		this.gameplaystate.camera.follow(this.sprite);

	    this.rope = new Phaser.Line(this.sprite.position.x, this.sprite.position.y, this.sprite.position.x, this.sprite.position.y);
	    
		this.hookShot.create(this.sprite);
		this.sprite.checkWorldBounds = true;
		this.sprite.events.onOutOfBounds.add(this.characterOutsideWorld);
	},

	update: function() {
		// Deaccelerate bobby by friction if he's on the ground
		if(this.sprite.body.touching.down){
			if(isNaN(this.sprite.body.velocity.x)) {
				this.sprite.body.velocity.x = 0;
			}
			else{
				this.sprite.body.velocity.x = this.sprite.body.velocity.x / 1.25;
			}

			// Walk left and right
			if (this.cursors.right.isDown) {
				this.sprite.body.velocity.x += this.ACCELERATION;
				this.sprite.animations.play('right');
				this.turned_right = true;
			}
			else if (this.cursors.left.isDown) {
				this.sprite.body.velocity.x += -this.ACCELERATION;
				this.sprite.animations.play('left');
				this.turned_right = false;
			}

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
				this.sprite.body.velocity.y = this.JUMP_ACCELERATION;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('jumpRight');
				else
					this.sprite.animations.play('jumpLeft');
			}

		}

		// A guide between bobby and the mouse
		if (this.turned_right)
			this.rope.start.set(this.sprite.position.x + 55, this.sprite.position.y);
		else
			 this.rope.start.set(this.sprite.position.x + 10, this.sprite.position.y);
		this.rope.end.set(this.gameplaystate.input.mousePointer.worldX, this.gameplaystate.input.mousePointer.worldY);


		// Fire ze hookshot!
		if(game.input.activePointer.isDown)
			this.hookShot.shoot(this.sprite.x, this.sprite.y, this.sprite);
	},

	render: function() {
		game.debug.geom(this.rope, '#4c4c33');
	},

	resetData: function() {
		// Jag är osäker på om vi vill sätta sprite osv. till null här. Gör inte det att bobbys sprite försvinner när vi resattar?
		this.sprite = null;
		this.cursors = null;
		this.rope = null;
		this.hookShot = new HookShot();
		this.hookShot.preload();
		this.turned_right = true;
		this.jumping = null;

	},

	characterOutsideWorld: function() {
		game.state.restart(game.state.current);
	}

};
