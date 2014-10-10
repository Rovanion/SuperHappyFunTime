/**
 * This level introduces the player to the concept of falling,
 * jumping and reaching a goal.
 */

Falling = function() {};

Falling.prototype = new Level('levels/Falling.csv', 60, 150);

// Overrides the update function from Level to add update events.
Falling.prototype.update = function() {
	Level.prototype.update.call(this);
};
