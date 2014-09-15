window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

	var platforms;
	var character = null;

        function preload () {
		game.load.image('background', 'assets/background.png');
		game.load.image('platform', 'assets/platform.png');
		character = new Main_character(game);
		character.preload();
        }

        function create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'background');

		platforms = game.add.group();

		platforms.enableBody = true;

		var floor = platforms.create(0, game.world.height - 64, 'platform');
		
		floor.scale.setTo(2, 2);

		floor.body.immovable = true;	
	
		character.create();	
        }

	function update() {
		game.physics.arcade.collide(character.sprite, platforms);

		character.update();
	}
};
