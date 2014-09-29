HookShot = function(gameState, parent) {
	this.gameState = gameState;
	this.parent = parent;
};

HookShot.prototype = {
	/**
	 * Function which should be called before the class is used in order to load it's assets
	 */
	preload: function() {
		this.gameState.load.image('chain', 'assets/chain.png', 64, 79);
	},

	create: function() {
		this.sprite = this.gameState.add.sprite(-100, -100, 'chain');
		this.gameState.physics.arcade.enable(this.sprite);
	},

	update: function(){
		this.gameState.physics.arcade.overlap(this.sprite, this.gameState.platforms, this.hit, null, this);

	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * Arguments are:
	 * x: The x-coordinate of the target.
	 * y: The y-coordinate of the target.
	 * attache: The object which should be moved to the target.
	 */
	shoot: function() {
		this.sprite.reset(this.parent.sprite.x, this.parent.sprite.y);
		this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 1000, game.input.activePointer, 500);
	},

	/**
	 * Called once the hook hits something.
	 */
	hit: function() {
		// Go after the hookshot
		game.physics.arcade.moveToObject(this.parent.sprite, this.sprite, 1000);
	}
};
