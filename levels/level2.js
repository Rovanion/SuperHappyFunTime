/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

 Level2 = function() {};

 Level2.prototype = new Level('levels/level2.csv', 80, 600, 920, 200);

// Overrides the preload function from Level to add update events.
Level2.prototype.preload = function() {
	Level.prototype.preload.call(this);

	this.load.spritesheet('arrow_buttons', 'assets/arrows.png', 100, 66);
	this.load.spritesheet('mouse', 'assets/mouse.png', 100, 123);
};

// Overrides the update function from Level to add update events.
Level2.prototype.create = function() {
	this.levelStateName = '2';
	this.nextLevelStateName = 'startMenu';
	Level.prototype.create.call(this);

	this.mouse = this.add.sprite(400, 400, 'mouse');
	this.mouse.anchor.setTo(0.5, 0.5);
	this.mouse.animations.add('blinking', [0, 1], 1);

	this.mouseText = this.add.text(this.mouse.x, this.mouse.y - 80, 'Release to Unlick', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.mouse.anchor.setTo(0.5, 0.5);
	this.mouseText.anchor.setTo(0.5, 0.5);
};

// Overrides the update function from Level to add update events.
Level2.prototype.update = function() {
	Level.prototype.update.call(this);

	this.mouse.animations.play('blinking');
};
