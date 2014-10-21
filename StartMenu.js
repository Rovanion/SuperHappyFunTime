StartMenu = function(){
	this.firstTimeRun = false;
	this.timerEnabled = false;
	this.inputEnabled = false;

	this.preload = function() {
		Level.prototype.preload.call(this);
		this.load.spritesheet('menyknapp', 'assets/menyknapp.png');
	};

	this.create = function() {
		Level.prototype.create.call(this);

		this.demo = new Demo(this, this.bobby);
		this.demo.run();

		this.choice = 0;
		this.loadChoices();

		this.cursors = this.input.keyboard.createCursorKeys();
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		this.updateTextColor();
	};

	this.update = function() {
		Level.prototype.update.call(this);
		if (this.enterKey.justPressed(1)) {
			if (this.choice === 0)
				this.play();
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
			this.choice = this.choice % 3;
			this.updateTextColor();
		}

	};

	this.loadChoices = function() {
		this.choices = [this.playText, this.loadText, this.highScoreText];

		for (var i = 0; i < this.choices.length; i++) {
			this.choices[i] = {};
			// TODO = Make it so that not every button changes to level 1.
			this.choices[i].button = this.add.button(
				0, game.height - 310 + i * 100, 'menyknapp', this.play, this
			);
			// Trust me, this ain't beautiful.
			this.choices[i].button.scale.setTo(0.65 + i * i * i * 0.07, 0.65);
			var that = this;
			this.choices[i].button.onInputOver.add((function(i) {
				return function() { that.mouseOver(i); }
			})(i), this);

			this.choices[i].text = this.add.text(50, game.height - 300 + i*100, "", {
				font: "50px Verdana",
				fil: "#ffffff",
				align: "left"
			});

			switch (i) {
			case 0:
				this.choices[i].text.setText("Play");
				break;
			case 1:
				this.choices[i].text.setText("Load");
				break;
			case 2:
				this.choices[i].text.setText("High Score");
				break;
			}

		}
	};

	this.updateTextColor = function() {
		for (var i = 0; i < this.choices.length; i++) {
			if (this.choice === i) {
				this.choices[i].text.fill = "#ff6789";
			} else {
				this.choices[i].text.fill = "#ffffff";
			}
		}
	};

	/**
	 * Fired when the play button is pressed.
	 */
	this.play = function(){
		game.state.start('1');
	};

	/**
	 * Fired when the active pointer enters a button.
	 */
	this.mouseOver = function(i){
		this.choice = i;
		this.updateTextColor();
	};
}

StartMenu.prototype = new Level('levels/startMenu.csv', 100, 200, 100, 120);
