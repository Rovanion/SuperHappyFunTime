Level = function (csvfile, characterStartX, characterStartY) {
	this.csvfile = csvfile;
	this.characterStartX = characterStartX;
	this.characterStartY = characterStartY;
};

Level.prototype = {

	preload: function() {
		this.load.image('background', 'assets/background.png');

		this.load.tilemap('map', this.csvfile, null, Phaser.Tilemap.CSV);
		this.load.image('tilemap', 'assets/platformblock.png');

		this.bobby = new Character(this);
		bobby = this.bobby;
		this.bobby.preload(this.characterStartX, this.characterStartY);

		this.timer = new Timer(this);
		this.timer.preload();
	},

	create: function() {
		var map = game.add.tilemap('map', 40, 40);

		map.addTilesetImage('tilemap');

		this.physics.startSystem(Phaser.Physics.Arcade);

		// Sets the size of the world depending on the size of the map
		this.add.tileSprite(0, 0, map.widthInPixels, map.heightInPixels, 'background');
		this.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		this.layer = map.createLayer(0);

		// Objects can collide with the tile
		map.setCollisionBetween(0, 0);

		this.bobby.create(this.characterStartX, this.characterStartY);
		this.timer.create();
	},

	update: function() {
		this.bobby.update();
	}
};
