BetweenLevels = function() {
};

BetweenLevels.prototype = {
	preload: function() {
		this.load.spritesheet('menyknapp', 'assets/menyknapp.png');
	},

	create: function() {
		this.choice = 0;
		this.loadChoices();
		this.cursors = this.input.keyboard.createCursorKeys();
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.stage.setBackgroundColor('#eff');
		this.updateTextColor();

		var congratulationsText = this.add.text(game.width/2, 100, 'You\'re awesome!', {
			font: "80px Verdana",
			fill: "#ff6789",
			align: "center"
		});
		congratulationsText.anchor.setTo(0.5, 0.5);

		var timeText = this.add.text(game.width/2, 200, 'You finished in ' + finishedLevelTime + ' seconds!', {
			font: "40px Verdana",
			fill: "#ff6789",
			align: "center"
		});
		timeText.anchor.setTo(0.5, 0.5);
	},

	update: function() {

		if (this.enterKey.justPressed(1)) {
			if (this.choice === 0)
				this.playNext();
			else if (this.choice === 1)
				this.replay();
		}

		if (this.cursors.up.justPressed(1)) {
			if (this.choice === 0)
				this.choice = 2;
			else
				this.choice--;
			this.updateTextColor();
		}
		else if (this.cursors.down.justPressed(1)) {
			this.choice++;
			this.choice = this.choice % 2;
			this.updateTextColor();
		}

	},

	loadChoices: function() {
		this.choices = [this.playNextText, this.replayText];

		this.choices[0] = {};
		this.choices[1] = {};

		this.choices[0].button = this.add.button(
			0, game.height - 310 + 0 * 100, 'menyknapp', this.playNext, this
		);
		this.choices[1].button = this.add.button(
			0, game.height - 310 + 1 * 100, 'menyknapp', this.replay, this
		);

		for (var i = 0; i < this.choices.length; i++) {

			var that = this;
			this.choices[i].button.onInputOver.add((function(i) {
				return function() {
					that.mouseOver(i);
				};
			})(i), this);

			this.choices[i].text = this.add.text(50, game.height - 300 + i*100, "", {
				font: "50px Verdana",
				fill: "#ffffff",
				align: "left"
			});

			switch (i) {
				case 0:
				this.choices[i].text.setText("Next Level");
				break;
				case 1:
				this.choices[i].text.setText("Replay Level");
				break;
			}
		}
		this.choices[0].button.scale.setTo(1.2, 0.65);
		this.choices[1].button.scale.setTo(1.4, 0.65);
	},

	updateTextColor: function() {
		for (var i = 0; i < this.choices.length; i++) {
			if (this.choice === i) {
				this.choices[i].text.fill = "#ff6789";
			} else {
				this.choices[i].text.fill = "#ffffff";
			}
		}
	},

	/**
	 * Fired when the play next button is pressed.
	 */
	playNext: function(){
		game.state.start(nextLevel);
	},

	/**
	 * Fired when the replay button is pressed.
	 */
	replay: function() {
		game.state.start(currentLevel);
	},

	/**
	 * Fired when the active pointer enters a button.
	 */
	mouseOver: function(i){
		this.choice = i;
		this.updateTextColor();
	},
};
