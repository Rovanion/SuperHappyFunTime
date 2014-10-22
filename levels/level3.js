/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

 Level3 = function() {};

 Level3.prototype = new Level('levels/level3.csv', 80, 400, 1500, 400);

// Overrides the preload function from Level to add update events.
Level3.prototype.preload = function() {
	Level.prototype.preload.call(this);
};

// Overrides the update function from Level to add update events.
Level3.prototype.create = function() {
	this.levelStateName = '3';
	this.nextLevelStateName = '4';
	Level.prototype.create.call(this);

	this.text = this.add.text(300, 550, 'Watch out for the pit!', {
		font: "20px Verdana",
		fill: "#000",
		align: "center"
	});
	this.text.anchor.setTo(0.5, 0.5);
};
