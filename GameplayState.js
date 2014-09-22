GameplayState = function() {
	Phaser.State.call(this, game);
	game.state.add('gameplay', this);
};

GameplayState.prototype = {
	preload: function() {
		this.level = new Level(this);
		this.level.preload();
		this.bobby = new Character(this);
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
