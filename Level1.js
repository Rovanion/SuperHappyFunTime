Level1 = function() {
	this.leftRightPressed = false;
	this.upPressed = false;
};

Level1.prototype = new Level(1600, 600);

Level1.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);

	this.addText(100, this.world.height - 180, "Press left and right arrows to move");

};

// Overrides the update function from Level to add update events.
Level1.prototype.update = function() {

	Level.prototype.update.call(this);

	if (!this.leftRightPressed && (cursors.right.isDown || cursors.left.isDown)) {
		this.changeText("Press arrow up to jump"); 
		this.leftRightPressed = true;
	}

	if (!this.upPressed && cursors.up.isDown) {
		this.changeText("");
		this.upPressed = true;
	}

};
