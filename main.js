window.onload = function() {

	game = new Phaser.Game(1024, 768, Phaser.CANVAS, '', {create: create});

	finishedLevelTime = 0;
	currentLevel = null;
	nextLevel = null;

	function create () {
		cursors = game.input.keyboard.createCursorKeys();
		setupLevels();
		game.state.start('title');
	}

	/**
	 * Sets up all levels for later consumption.
	 * It is later possible to switch between the levels by
	 * calling game.state.start(n); where n is the number of
	 * the level.
	 */
	function setupLevels(){
		game.state.add('1', new Level1());
		game.state.add('2', new Level2());
		game.state.add('3', new Level3());
		game.state.add('4', new Level4());
		game.state.add('5', new Level5());
		game.state.add('6', new Level6());
		game.state.add('7', new Level7());
		game.state.add('startMenu', new StartMenu());
		game.state.add('title', new TitleScreen());
		game.state.add('betweenLevels', new BetweenLevels());
	}
};
