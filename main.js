window.onload = function() {

	game = new Phaser.Game(800, 200, Phaser.AUTO, '', {create: create});

	function create () {
		state = new GameplayState();
		game.state.add('gameplay', state);
		game.state.start("gameplay");
	}
};
