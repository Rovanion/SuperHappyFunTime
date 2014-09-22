window.onload = function() {

	game = new Phaser.Game(800, 300, Phaser.AUTO, '', {create: create});

	function create () {
		gameplay = new gameplaystate();

		game.state.start("gameplay");
	}
};
