/**
 * This level introduces the player to the concept of falling,
 * jumping and reaching a goal.
 */

Falling = function() {
	this.characterStartY = this.characterStartX = 60;
};

Falling.prototype = new Level(1000, 1500);

Falling.prototype.loadLevelObjects = function() {
	// Around the edges
	this.addPlatform(0, 0, 1000, 20);
	this.addPlatform(0, 0, 20, 1000);
	this.addPlatform(980, 0, 20, 1000);
	// The start platform
	this.addPlatform(0, 150, 200, 800);
	// The wall infront
	this.addPlatform(400, 0, 200, 400);
	this.addPlatform(350, 0, 200, 200);
	// Second floor
	this.addPlatform(200, 300, 100, 500);
	// Third floor
	this.addPlatform(300, 600, 500, 500);
	// Jumping up on
	this.addPlatform(600, 550, 200, 200);
	this.addPlatform(700, 500, 200, 200);
	this.addPlatform(800, 450, 200, 200);
	// Another roof
	this.addPlatform(600, 0, 400, 200);
};
