HookShot = function() {
	this.velocity = 0;
}

HookShot.prototype = {
	/**
	 * Function which should be called before the class is used in order to load it's assets
	 */
	preload: function() {
		game.load.image('chain', 'assets/chain.jpg', 64, 79);
		this.sprite = this.gameplaystate.add.sprite(50, 50, 'chain');
		this.gameplaystate.physics.arcade.enable(this.sprite);
	},

	create: function() {
		this.sprite = game.add.sprite(200, 20, 'chain');
	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * Returns the target which was hit.
	 */
	shoot: function(x, y, attache) {
		game.physics.arcade.moveToPointer(attache, 500);
		return null;
	}
}
