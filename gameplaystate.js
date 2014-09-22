gameplaystate = function() {
	Phaser.State.call(this, game);
	game.state.add('gameplay', this);
};

gameplaystate.prototype = {
	preload: function() {
		this.level = new Level(this);
		this.level.preload();
		this.character = new bobby(this);
		this.character.preload();
	},

	create: function() {
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.level.create();
		this.character.create();
	},

	update: function() {
		this.physics.arcade.collide(this.character.sprite, this.level.platforms);
		this.character.update();
	},

	render: function() {
		this.character.render();
	}
};
