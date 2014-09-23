HookShot = function() {

}

Character.prototype = {
	preload: function() {
		game.load.image('chain', 'assets/chain.jpg', 64, 79);
	},

	create: function() {
		this.sprite = game.add.sprite(200, 20, 'chain');
	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * Returns the target which was hit.
	 */
	shoot: function(x, y) {
		game.physics.arcade.moveToPointer(this, 500);
		return null;
	}
}
