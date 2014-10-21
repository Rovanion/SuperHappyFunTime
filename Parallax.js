/**
 * Creates a background which follows the camera, but slower.
 */


/**
 * Constructor. Takes no arguments.
 */
Parallax = function(gameState){
	this.gameState = gameState;
}

Parallax.prototype = {
	preload: function(){
		this.image = this.gameState.load.image('parallax', 'assets/parallax.jpg');
	},

	create: function(){
		this.background = this.gameState.add.tileSprite(0, 0, 1024, 681, 'parallax');
	},

	update: function(){
		this.background.position.x = this.gameState.camera.x / 1.7;
		this.background.position.y = this.gameState.camera.y / 1.7;
	}
}
