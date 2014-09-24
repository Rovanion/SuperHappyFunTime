GameplayState = function() {
	Phaser.State.call(this, game);
};

GameplayState.prototype = {
	preload: function() {
		this.level = new Level(this);
		this.level.preload();
		this.bobby = new Character(this);

		// This only exists for easy access from the console, do not use in code.
		bobby = this.bobby;
		this.bobby.preload();
	},

	create: function() {
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.level.create();
		this.bobby.create();
	},

	update: function() {
		this.physics.arcade.collide(this.bobby.sprite, this.level.platforms);
		this.bobby.update();
	},

	render: function() {
		this.bobby.render();
	}
};
