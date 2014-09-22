window.onload = function() {

	game = new Phaser.Game(800, 300, Phaser.AUTO, '', {create: create});

	function create () {
		state = new GameplayState();

		game.state.start("gameplay");
	}
};
