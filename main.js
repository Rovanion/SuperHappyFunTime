window.onload = function() {

	game = new Phaser.Game(800, 200, Phaser.AUTO, '', {create: create});

	function create () {
		state = new Level1();
		game.state.add('level1', state);
		game.state.start("level1");
	}
};
