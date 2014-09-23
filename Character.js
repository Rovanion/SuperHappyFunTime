bobby = function(gameplaystate) {
	this.gameplaystate = gameplaystate;
	this.resetData();
};

bobby.prototype = {

	preload: function() {
		this.gameplaystate.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
	},

	create: function() {
		this.sprite = this.gameplaystate.add.sprite(this.INITIAL_POSITION_X, this.INITIAL_POSITION_Y, 'character');
		this.gameplaystate.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = this.GRAVITY;

		this.sprite.animations.add('left', [0, 1, 2, 3], 15);
		this.sprite.animations.add('right', [5, 6, 7, 4], 15);
		this.sprite.animations.add('jumpLeft', [2], 10);
		this.sprite.animations.add('jumpRight', [7], 10);

		this.cursors = this.gameplaystate.input.keyboard.createCursorKeys();

		this.gameplaystate.camera.follow(this.sprite);

		this.rope = new Phaser.Line(this.sprite.position.worldX + 64, this.sprite.position.worldY, this.sprite.position.worldX + 64, this.sprite.position.worldY);
	},

	update: function() {

		if(this.sprite.body.touching.down){
			if(isNaN(this.sprite.body.velocity.x)) {
				this.sprite.body.velocity.x = 0;
			}
			else{
				this.sprite.body.velocity.x = this.sprite.body.velocity.x / 1.25;
			}
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

			if (this.cursors.up.isDown) {
				this.sprite.body.velocity.y = this.JUMP_ACCELERATION;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('jumpRight');
				else
					this.sprite.animations.play('jumpLeft');
			}
			
		}
		else{

		}

		if (this.turned_right)
			this.rope.start.set(this.sprite.position.x + 64, this.sprite.position.y);
		else
			this.rope.start.set(this.sprite.position.x, this.sprite.position.y);
		this.rope.end.set(this.gameplaystate.input.mousePointer.worldX, this.gameplaystate.input.mousePointer.worldY);
	},

	render: function() {
		game.debug.geom(this.rope, '#4c4c33');
	},

	resetData: function() {
		this.sprite = null;
		this.cursors = null;
		this.rope = null;
		this.turned_right = true;

		this.INITIAL_POSITION_X = 32;
		this.INITIAL_POSITION_Y = this.gameplaystate.world.height;
		this.GRAVITY = 500;
		this.ACCELERATION = 60;
		this.JUMP_ACCELERATION = -250;
	}

};