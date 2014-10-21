/**
 * This level introduces the player the controls,
 * jumping and reaching a goal using the hookshot.
 */

 Level4 = function() {};

 Level4.prototype = new Level('levels/level4.csv', 80, 80, 2300, 120);

// Overrides the preload function from Level to add update events.
Level4.prototype.preload = function() {
	Level.prototype.preload.call(this);

	this.load.spritesheet('arrow_buttons', 'assets/arrows.png', 100, 66);
	this.load.spritesheet('mouse', 'assets/mouse.png', 100, 123);
};

// Overrides the update function from Level to add update events.
Level4.prototype.create = function() {
	this.levelStateName = '4';
	this.nextLevelStateName = 'startMenu';
	Level.prototype.create.call(this);
};
