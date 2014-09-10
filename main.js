window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {
		game.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
        }

        function create () {
		var character = game.add.sprite(30, game.world.height - 120, 'character');
        }

	function update(){

	}
};
