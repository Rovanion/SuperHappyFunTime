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
		this.counterText = this.gameState.add.text(45, game.height - 49, '0.00', {
			font: "26px Verdana",
			fill: "#fff",
			align: "center"
		});
		// The texts position is relative to the cameras.
		this.counterText.fixedToCamera = this.background.fixedToCamera = true;
		this.gameState.time.events.loop(100, this.updateCounter, this);

	},

	updateCounter: function() {
		this.counter++;
		if(this.counter % 10 === 0){
			this.counterText.setText(this.counter / 10 + ".0");
			if(this.counter === 100)
				this.counterText.cameraOffset.x = 38;
			else if(this.counter === 1000)
				this.counterText.cameraOffset.x = 30;
		}
		else
			this.counterText.setText(this.counter / 10);
	}
}
