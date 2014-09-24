HookShot = function() {
}

HookShot.prototype = {
	/**
	 * Function which should be called before the class is used in order to load it's assets
	 */
	preload: function() {
		game.state.getCurrentState().load.image('chain', 'assets/chain.png');
	},

	create: function(holder) {
		// The maximum number of particles is 1000.
		this.emitter = game.add.emitter(50, 0, 1000);
		this.emitter.makeParticles('chain');

		holder.addChild(this.emitter);
	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * Arguments are:
	 * x: The x-coordinate of the target.
	 * y: The y-coordinate of the target.
	 * attache: The object which should be moved to the target.
	 * Returns the target which was hit, null if none was hit.
	 */
	shoot: function(x, y, attache) {
		this.emitter.emitParticle();
		game.physics.arcade.moveToPointer(attache, 500);
		return null;
	}
}
