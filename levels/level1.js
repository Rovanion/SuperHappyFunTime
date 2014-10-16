/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

 Level1 = function() {};

 Level1.prototype = new Level('levels/level1.csv', 80, 400, 1415, 280);

// Overrides the preload function from Level to add update events.
Level1.prototype.preload = function() {
	Level.prototype.preload.call(this);

	this.load.spritesheet('arrow_buttons', 'assets/arrows.png', 100, 66);
	this.load.spritesheet('mouse', 'assets/mouse.png', 100, 123);
};

// Overrides the update function from Level to add update events.
Level1.prototype.create = function() {
	this.levelStateName = '1';
	this.nextLevelStateName = '2';

	Level.prototype.create.call(this);

	// Adds a picture of the arrow buttons to show the user that these are used to jump and move left and right

	this.arrowkeys = this.add.sprite(300, 250, 'arrow_buttons');
	this.arrowkeys.anchor.setTo(0.5, 0.5);
	this.arrowkeys.animations.add('blinking', [0, 1], 1);

	this.arrowUpText = this.add.text(this.arrowkeys.x, this.arrowkeys.y - 52, 'Jump', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.arrowUpText.anchor.setTo(0.5, 0.5);

	this.arrowLeftText = this.add.text(this.arrowkeys.x - 110, this.arrowkeys.y + 22, 'Move left', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.arrowLeftText.anchor.setTo(0.5, 0.5);

	this.arrowRightText = this.add.text(this.arrowkeys.x + 120, this.arrowkeys.y + 22, 'Move right', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.arrowRightText.anchor.setTo(0.5, 0.5);

	// Adds a picture of the mouse button to show the user that it can be used

	this.mouse = this.add.sprite(1150, 250, 'mouse');
	this.mouse.anchor.setTo(0.5, 0.5);
	this.mouse.animations.add('blinking', [0, 1], 1);

	this.mouseText = this.add.text(this.mouse.x, this.mouse.y - 80, 'Hold to Lick', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.mouse.anchor.setTo(0.5, 0.5);
	this.mouseText.anchor.setTo(0.5, 0.5);
};


// Overrides the update function from Level to add update events.
Level1.prototype.update = function() {
	Level.prototype.update.call(this);

	this.arrowkeys.animations.play('blinking');
	this.mouse.animations.play('blinking');
};
