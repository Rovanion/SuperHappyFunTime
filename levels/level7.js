/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

Level7 = function() {};

Level7.prototype = new Level('levels/level7.csv', 80, 200, 100, 500);

// Overrides the preload function from Level to add update events.
Level7.prototype.preload = function() {
	Level.prototype.preload.call(this);
};

// Overrides the update function from Level to add update events.
Level7.prototype.create = function() {
	this.levelStateName = '7';
	this.nextLevelStateName = 'startMenu';
	Level.prototype.create.call(this);

	this.addMovingSawBlade(200, 40, 200, 350);
	this.addMovingSawBlade(450, 40, 450, 350);
	this.addMovingSawBlade(700, 40, 700, 350);
	this.addMovingSawBlade(950, 40, 950, 350);

	this.addSawBlade(1200, 500);
	this.addSawBlade(1400, 500);

	this.addSawBlade(1100, 1000);
	this.addSawBlade(1300, 1000);
	this.addSawBlade(1500, 1000);

	this.addSawBlade(1200, 1500);
	this.addSawBlade(1400, 1500);

	this.addSawBlade(1100, 1900);
	this.addSawBlade(1300, 1900);
	this.addSawBlade(1500, 1900);

	this.addSawBlade(1200, 2400);
	this.addSawBlade(1400, 2400);
};