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
	bgScale: 1.5,
	fgScale: 3,
	preload: function(){
		this.image = this.gameState.load.image('bg', 'assets/bg.png');
		this.image = this.gameState.load.image('bg2', 'assets/bg2.png');
		this.gameState.stage.setBackgroundColor('#bff');
	},

	create: function(){
		console.debug(this.gameState.world.width);
		this.background = this.gameState.add.tileSprite(
			0, 0, this.gameState.world.width * this.bgScale, 434, 'bg'
		);
		this.foreground = this.gameState.add.tileSprite(
			0, 0, this.gameState.world.width * this.fgScale, 250, 'bg2'
		);
	},

	update: function(){
		this.background.position.x = this.gameState.camera.x / this.bgScale;
		this.background.position.y = this.gameState.world.height - 480;
		this.foreground.position.x = this.gameState.camera.x / this.fgScale;
		this.foreground.position.y = this.gameState.world.height - 250;
	}
}
