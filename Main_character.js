Main_character = function(game) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;

	this.INITIAL_POSITION_X = 32;
	this.INITIAL_POSITION_Y = game.world.height - 150;
	this.GRAVITY = 300;
	this.BOUNCE_FACTOR = 0.2;
	this.VELOCITY = 300;
	this.JUMP_VELOCITY = -200;
} 

Main_character.prototype = {

preload: function() {
		 this.game.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
	 },

create: function() {
		this.sprite = this.game.add.sprite(this.INITIAL_POSITION_X, this.INITIAL_POSITION_Y, 'character');
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.bounce.y = this.BOUNCE_FACTOR;
		this.sprite.body.gravity.y = this.GRAVITY;
		this.sprite.body.collideWorldBounds = true;

		this.sprite.animations.add('left', [0, 1, 2, 3], 10);
		this.sprite.animations.add('right', [4, 5, 6, 7], 10);

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},

update: function() {
		this.sprite.body.velocity.x = 0;

		if (this.cursors.right.isDown) {
			this.sprite.body.velocity.x = this.VELOCITY;
			this.sprite.animations.play('right');
		}
		else if (this.cursors.left.isDown) {
			this.sprite.body.velocity.x = -this.VELOCITY;
			this.sprite.animations.play('left');
		}
		else {
			this.sprite.animations.stop();
		}

		if (this.cursors.up.isDown && this.sprite.body.touching.down) {
			this.sprite.body.velocity.y = this.JUMP_VELOCITY;
		}
	}
};
