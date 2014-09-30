StartMenu = function() {};

StartMenu.prototype = {

	preload: function() {

	},

	create: function() {

		this.choice = 0;

		this.loadChoices();

		this.cursors = this.input.keyboard.createCursorKeys();
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},

	update: function() {

		if (this.enterKey.justPressed()) {
			if (this.choice === 0)
				game.state.start('1');
		}

		if (this.cursors.up.justPressed(1)) {
			if (this.choice === 0)
				this.choice = 2;
			else
			this.choice--;
		}
		else if (this.cursors.down.justPressed(1)) {
			this.choice++;
			this.choice = this.choice % 3;
		}

		for (var i = 0; i < this.choices.length; i++) {
			if (this.choice === i) {
				this.choices[i].fill = "#ff6789";
			} else {
				this.choices[i].fill = "#ffffff";
			}
		}

	},

	loadChoices: function() {
		this.choices = [this.playText, this.loadText, this.highScoreText];

		for (var i = 0; i < this.choices.length; i++) {
			this.choices[i] = this.add.text(50, 300 + i*100, "", {
				font: "50px Arial",
				fill: "#ffffff",
				align: "left"
			});

			switch (i) {
				case 0:
				this.choices[i].setText("Play");
				break;
				case 1:
				this.choices[i].setText("Load");
				break;
				case 2:
				this.choices[i].setText("High Score");
				break;
			}

		}
	},

	onEnterPressed: function() {

	}
};