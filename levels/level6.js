/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

Level6 = function() {};

Level6.prototype = new Level('levels/level6.csv', 80, 600, 3080, 750);

// Overrides the preload function from Level to add update events.
Level6.prototype.preload = function() {
	Level.prototype.preload.call(this);
};

// Overrides the update function from Level to add update events.
Level6.prototype.create = function() {
	this.levelStateName = '6';
	this.nextLevelStateName = 'startMenu';
	Level.prototype.create.call(this);

	this.addSawBlade(800, 700);
	this.addSawBlade(1600, 450);
	this.addSawBlade(1900, 450);
	this.addSawBlade(2200, 450);
};