bobby = function() {
	this.sprite = null;
	this.cursors = null;

	this.INITIAL_POSITION_X = 32;
	this.INITIAL_POSITION_Y = game.world.height;
	this.GRAVITY = 500;
	this.ACCELERATION = 60;
	this.JUMP_ACCELERATION = -250;
}

bobby.prototype = {

	preload: function() {
		game.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
	},

	create: function() {
		this.sprite = game.add.sprite(this.INITIAL_POSITION_X, this.INITIAL_POSITION_Y, 'character');
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = this.GRAVITY;

		this.sprite.animations.add('left', [0, 1, 2, 3], 15);
		this.sprite.animations.add('right', [5, 6, 7, 4], 15);
		this.sprite.animations.add('jumpLeft', [2], 10);
		this.sprite.animations.add('jumpRight', [7], 10);

		this.cursors = game.input.keyboard.createCursorKeys();

		game.camera.follow(this.sprite);
	},

	update: function() {

		if(this.sprite.body.touching.down){
			if(this.sprite.body.velocity.x == NaN){
				this.sprite.body.velocity.x = 0;
			}
			else{
				this.sprite.body.velocity.x = this.sprite.body.velocity.x / 1.25;
			}
			if (this.cursors.right.isDown) {
				this.sprite.body.velocity.x += this.ACCELERATION;
				this.sprite.animations.play('right');
			}
			else if (this.cursors.left.isDown) {
				this.sprite.body.velocity.x += -this.ACCELERATION;
				this.sprite.animations.play('left');
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
	}
};
