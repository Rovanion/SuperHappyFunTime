/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

 Level3 = function() {};

 Level3.prototype = new Level('levels/level3.csv', 80, 400, 1500, 200);

// Overrides the preload function from Level to add update events.
Level3.prototype.preload = function() {
	Level.prototype.preload.call(this);

	this.load.spritesheet('arrow_buttons', 'assets/arrows.png', 100, 66);
	this.load.spritesheet('mouse', 'assets/mouse.png', 100, 123);
};

// Overrides the update function from Level to add update events.
Level3.prototype.create = function() {
	this.levelStateName = '3';
	this.nextLevelStateName = 'startMenu';
	Level.prototype.create.call(this);

	this.text = this.add.text(500, 300, 'Watch out for the pit!', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.text.anchor.setTo(0.5, 0.5);
};
