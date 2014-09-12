window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

        function preload () {
		game.load.image('background', 'assets/background.png');
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
        }

	var platforms;
	var character;
	var cursors;

        function create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'background');

		platforms = game.add.group();

		platforms.enableBody = true;

		var floor = platforms.create(0, game.world.height - 64, 'platform');
		
		floor.scale.setTo(2, 2);

		floor.body.immovable = true;

		character = game.add.sprite(32, game.world.height - 150, 'character');

		game.physics.arcade.enable(character);

		character.body.bounce.y = 0.2;
		character.body.gravity.y = 300;
		character.body.collideWorldBounds = true;

		character.animations.add('right', [0, 1, 2, 3], 10);

		cursors = game.input.keyboard.createCursorKeys();
        }

	function update() {
		game.physics.arcade.collide(character, platforms);

		if (cursors.right.isDown) {
			character.body.velocity.x = 300;
			
			character.animations.play('right');
		}
		else {
			character.animations.stop();
		}

		if (cursors.up.isDown && character.body.touching.down) {
			character.body.velocity.y = -200;
		}
	}
};
