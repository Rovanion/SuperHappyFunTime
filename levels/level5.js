/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

Level5 = function() {};

Level5.prototype = new Level('levels/level5.csv', 400, 4500, 2000, 1800);

// Overrides the preload function from Level to add update events.
Level5.prototype.preload = function() {
	Level.prototype.preload.call(this);
};

// Overrides the update function from Level to add update events.
Level5.prototype.create = function() {
	this.levelStateName = '5';
	this.nextLevelStateName = '6';
	Level.prototype.create.call(this);
};
