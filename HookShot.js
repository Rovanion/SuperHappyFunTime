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
		this.pulling = false;
		this.leftGround = true;
		this.PULL_SPEED = 1000;
	},

	update: function(){
		this.gameState.physics.arcade.overlap(this.sprite, this.gameState.platforms, this.hit, null, this);

		// Pull the parent toward the goal until reached.
		if (this.pulling){
			if(this.parent.sprite.body.touching.none || ! this.leftGround){
				var angle = game.physics.arcade.angleBetween(this.sprite, this.parent.sprite);
				this.parent.sprite.body.velocity.x = -this.PULL_SPEED * Math.cos(angle);
				this.parent.sprite.body.velocity.y = -this.PULL_SPEED * Math.sin(angle);
				this.leftGround = true;
			}
			else
				this.pulling = false;
		}
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
		// Will make the update function pull the parent toward the goal until reached.
		this.pulling = true;
		if(this.parent.sprite.body.touching.down)
			this.leftGround = false;
	}
};
