Timer = function(gameState){
	this.gameState = gameState;
}

Timer.prototype = {
	counter: 0,

	preload: function(){
		this.gameState.load.spritesheet('time-background', 'assets/time-background.png');
	},

	create: function(){
		this.background = this.gameState.add.sprite(0, game.height - 60, 'time-background');
		this.background.scale.x = this.background.scale.y = 0.4;
		this.counterText = this.gameState.add.text(37, game.height - 49, '0.00', {
			font: "26px Verdana",
			fill: "#fff",
			align: "center"
		});
		// The texts position is relative to the cameras.
		this.counterText.fixedToCamera = this.background.fixedToCamera = true;
		this.gameState.time.events.loop(10, this.updateCounter, this);

	},

	updateCounter: function() {
		this.counter++;
		this.counterText.setText(this.counter / 100);
		if(this.counter < 1000)
			this.counterText.setText(this.counter / 100);
		else
			this.counterText.setText((this.counter / 100).toFixed(1));
	}
}
