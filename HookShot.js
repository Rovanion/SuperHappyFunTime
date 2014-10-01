HookShot = function(gameState, parent) {
	this.gameState = gameState;
	this.parent = parent;
};

HookShot.prototype = {
	// Wether or not the hookshot is shooting out or not.
	shooting: false,
	// Wether or not the hookshot is pulling the player in or not.
	pulling: false,
	// Set when pulling back a failing hook.
	cancelling: false,
	// The hook can only be shot so often
	cooldown: false,
	// The speed at which the hook draws the character towards its target.
	speed: 1000,

	/**
	 * Function which should be called before the class is used in order to load it's assets
	 */
	preload: function() {
		this.gameState.load.image('hook', 'assets/hook.png');
		this.gameState.load.image('chain', 'assets/chain.png');
	},

	create: function() {
		this.hook = this.gameState.add.sprite(-100, -100, 'hook');
		this.gameState.physics.arcade.enable(this.hook);
		this.hook.anchor.setTo(0.1, 0.5);

		this.chain = this.gameState.add.sprite(0, 0, 'chain');
		this.hook.addChild(this.chain);
		this.chain.anchor.setTo(1, 0.5);
		this.chain.z = 0;
		console.debug(this.hook);
	},

	update: function() {
		// We're either shooting the hook, pulling the character towards a target,
		// cancelling a failed shot or doing nothing.
		if(this.shooting){
			this.gameState.physics.arcade.collide(
				this.hook, this.gameState.platforms, this.hit, null, this);
			var distance = game.physics.arcade.distanceBetween(this.hook, this.parent.sprite);

			if (distance > 500)
				this.cancelHook();
		}
		else if(this.pulling){
			this.gameState.physics.arcade.overlap(
				this.hook, this.parent.sprite, this.reachedTarget, null, this);
			var angle = game.physics.arcade.angleBetween(this.hook, this.parent.sprite);
			this.parent.sprite.body.velocity.x = -this.speed * Math.cos(angle);
			this.parent.sprite.body.velocity.y = -this.speed * Math.sin(angle);
		}
		else if(this.cancelling){
			var distance = game.physics.arcade.distanceBetween(this.hook, this.parent.sprite);
			if(Phaser.Math.fuzzyEqual(distance, 0, 10)){
				this.hook.kill();
				this.cancelling = false;
			}
		}
		else
			return;

		this.hook.angle = 180 + Phaser.Math.radToDeg(
			game.physics.arcade.angleBetween(this.hook, this.parent.sprite));

	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 */
	shoot: function() {
		if( !this.shooting && !this.pulling && !this.cancelling && !this.cooldown ){
			this.hook.reset(this.parent.sprite.x, this.parent.sprite.y);
			this.hook.rotation = game.physics.arcade.moveToPointer(this.hook, this.speed, game.input.activePointer, 500);

			this.shooting = this.cooldown = true;
			// The cooldown runs out in 2 seconds.
			var that = this;
			setTimeout(function() {
				that.cooldown = false
			}, 1000);
			console.debug(this);
		}
	},

	/**
	 * Called once the hook hits something.
	 */
	hit: function() {
		this.hook.body.velocity.x =	this.hook.body.velocity.y = 0;

		// Will make the update function pull the parent toward the goal until reached.
		this.pulling = true;
		this.shooting = false;
	},

	/**
	 * Called once the parent has reached the end of the hookshot.
	 */
	reachedTarget: function() {
		this.pulling = false;
		this.hook.kill();
	},

	cancelHook: function() {
		this.shooting = this.pulling = false;
		this.cancelling = true;
		game.physics.arcade.moveToObject(this.hook, this.parent.sprite, 1500);
	}
};
