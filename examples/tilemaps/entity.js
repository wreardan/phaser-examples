//ENtity Base Class
function Entity() {
	this.kelp_cost = 3
	this.coral_cost = 2
	this.steam_cost = 1
}

Entity.prototype.init = function(game, x, y, player_id, sprite_name) {
	this.game = game
	this.x = x
	this.y = y
	this.player_id = player_id
	this.sprite_name = sprite_name

	this.sprite = game.add.sprite(x * TILE_WIDTH, y * TILE_HEIGHT, sprite_name);
	this.state = 0

	var sprite = game.cache.getImage(sprite_name)

	this.tiles_x = sprite.width / TILE_WIDTH
	this.tiles_y = sprite.height / TILE_HEIGHT

	this.produces = []	//List of Entities that the Entity can produce
}

Entity.prototype.update = function() {
	this.sprite.x = this.x * TILE_WIDTH
	this.sprite.y = this.y * TILE_HEIGHT
}

Entity.prototype.move = function(x, y) {
	this.x = x
	this.y = y
	this.update()
}

Entity.prototype.move_delta = function(x, y) {
	this.x += x
	this.y += y
	this.update()
}

//Structure Class, inherits from Entity
function Structure() {
}

Structure.prototype = new Entity()
Structure.prototype.constructor = Structure

Structure.prototype.init = function(game, x, y, player_id, sprite_name) {
	Entity.prototype.init.call(this, game, x, y, player_id, sprite_name) //Call the Parent Constructor
}

Structure.prototype.move = function(x, y) {
	//do nothing, structures don't move
}

Structure.prototype.move_delta = function(x, y) {
	//do nothing, structures don't move
}

//Town Hall class that builds harvesters and collects resources
function TownHall() {
	this.kelp_cost = 16
	this.coral_cost = 8
	this.steam_cost = 0
}

TownHall.prototype = new Structure()
TownHall.prototype.constructor = TownHall

TownHall.prototype.init = function(game, x, y, player_id, sprite_name) {
	Structure.prototype.init.call(this, game, x, y, player_id, sprite_name) //Call the Parent Constructor
}

//Structure Class, inherits from Entity
function Unit() {
}

Unit.prototype = new Entity()
Unit.prototype.constructor = Unit

Unit.prototype.init = function(game, x, y, player_id, sprite_name) {
	Entity.prototype.init.call(this, game, x, y, player_id, sprite_name) //Call the Parent Constructor
}

//Harvester Unit that collects resources and builds structures
function Harvester() {
	this.kelp_cost = 2
	this.coral_cost = 0
	this.steam_cost = 1
}

Harvester.prototype.init = function(game, x, y, player_id, sprite_name) {
	sprite_name = 'snake'
	
	Unit.prototype.init.call(this, game, x, y, player_id, sprite_name) //Call the Parent Constructor

	this.produces.push(TownHall)

    this.sprite.animations.add('left', [3,4,5], 10, true);
    this.sprite.animations.add('right', [6,7,8], 10, true);
    this.sprite.animations.add('up', [9,10,11], 10, true);
    this.sprite.animations.add('down', [0,1,2], 10, true);
}

Unit.prototype = new Unit();
Harvester.prototype.constructor = Harvester;

