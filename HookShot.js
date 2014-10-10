HookShot = function(gameState) {
	this.gameState = gameState;
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
	// Defining the length of the cooldown
	cooldownLength: 500,
	// The speed at which the hook draws the character towards its target.
	speed: 1200,

	/**
	 * Function which should be called before the class is used in order to load it's assets
	 */
	preload: function() {
		this.gameState.load.image('hook', 'assets/hook.png');
		this.gameState.load.image('chain', 'assets/chain.png');
	},

	create: function(parent) {
		this.parent = parent;
		this.hook = this.gameState.add.sprite(-100, -100, 'hook');
		this.gameState.physics.arcade.enable(this.hook);
		this.hook.anchor.setTo(0.1, 0.5);

		this.chain = this.gameState.add.sprite(0, 0, 'chain');
		this.hook.addChild(this.chain);
		this.chain.anchor.setTo(1, 0.5);
		this.chain.z = 0;
	},

	update: function() {
		// We're either shooting the hook, pulling the character towards a target,
		// cancelling a failed shot or doing nothing.
		if(this.shooting){
			this.gameState.physics.arcade.collide(
				this.hook, this.gameState.layer, this.hit, null, this);
			var distance = game.physics.arcade.distanceBetween(this.hook, this.parent);

			if (distance > 400)
				this.cancelHook();
		}
		else if(this.pulling){
			var angle = game.physics.arcade.angleBetween(this.hook, this.parent);
			this.parent.body.velocity.x = -this.speed * Math.cos(angle);

			this.parent.body.velocity.y = -this.speed * Math.sin(angle);
		}
		else if(this.cancelling){
			var distance = game.physics.arcade.distanceBetween(this.hook, this.parent);
			if(Phaser.Math.fuzzyEqual(distance, 0, 120)) {
				this.hook.kill();
				this.cancelling = false;

				// The cooldown runs out in 2 seconds.
				var that = this;
				setTimeout(function() {
					that.cooldown = false
				}, this.cooldownLength);
			}
			var angle = game.physics.arcade.angleBetween(this.hook, this.parent);
			this.hook.body.velocity.x = this.speed * Math.cos(angle);
			this.hook.body.velocity.y = this.speed * Math.sin(angle);
		}
		else
			return;

		this.hook.angle = 180 + Phaser.Math.radToDeg(
			game.physics.arcade.angleBetween(this.hook, this.parent));

	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * The hook is shot from, well, fromX and fromY.
	 */
	shoot: function(fromX, fromY) {
		if (!this.shooting && !this.pulling && !this.cancelling && !this.cooldown){
			var angle = game.physics.arcade.angleToPointer(this.parent);
			this.hook.reset(fromX, fromY);
			this.hook.rotation = game.physics.arcade.moveToPointer(this.hook, this.speed);
			this.shooting = this.cooldown = true;
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
	 * Pull back the hook from any situation cancelling both shooting it out and
	 * the parent being pulled to the target of the hook.
	 */
	cancelHook: function() {
		if(!this.cancelling) {
			this.shooting = this.pulling = false;
			this.cancelling = true;
			game.physics.arcade.moveToObject(this.hook, this.parent, 1500);
		}
	}
};
