'use_strict';

/**
 * @Constructor
 */
TitleScreen = function(){
	;
}

TitleScreen.prototype = {
	preload: function(){
		this.load.image('super', 'assets/title/super.png');
		this.load.image('happy', 'assets/title/happy.png');
		this.load.image('fun', 'assets/title/fun.png');
		this.load.image('time', 'assets/title/time.png');
		this.load.image('line', 'assets/title/line.png');
		this.load.audio('funtime', ['assets/sound/super-happy-fun-time.opus', 'assets/sound/super-happy-fun-time.ogg'], true);
		// Make the background white.
		game.stage.backgroundColor = '#fff';
	},

	create: function(){
		this.graphics = game.add.group(this.group, "graphics");
		this.line = this.graphics.create(700, 545, 'line', this.graphics);
		this.super = this.graphics.create(580, 550, 'super', this.graphics);
		this.happy = this.graphics.create(1500, 650, 'happy', this.graphics);
		this.fun = this.graphics.create(430, 920, 'fun', this.graphics);
		this.time = this.graphics.create(1050, 920, 'time', this.graphics);
		this.sound = this.add.audio('funtime');

		game.time.events.add(800, function() {this.sound.play()}, this);

		// Queue up the animations!
		var delay = 0;
		this.graphics.forEach( function(sprite){
			delay += 300;
			sprite.anchor.setTo(0.5, 0.5);
			this.tweens.create(sprite).from({alpha: 0}, 200, null, true, delay, false, false);
			this.tweens.create(sprite.scale).from({x: 5, y: 5}, 300, Phaser.Easing.Elastic.Out, true, delay + 50, false, false);
		}, this);

		// Position all of it in the middle.
		var size = Math.min(game.width, game.height);
		this.graphics.scale.set(size / 1430, size / 1216);
		this.graphics.position.setTo((game.width - size) / 2, (game.height - size) / 2);

		this.input.keyboard.addCallbacks(this, this.goToMenu);
	},
	update: function(){
		if(game.input.activePointer.isDown)
			game.state.start('startMenu');
	},

	goToMenu: function(){
		game.state.start('startMenu');
	}
};
