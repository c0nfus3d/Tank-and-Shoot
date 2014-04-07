ig.module(
	'game.entities.powerup_health'
)
.requires(
	'impact.entity'
)
.defines(function(){

powerup_health = ig.Entity.extend({

	/* A few variables */
	size: { x: 29, y: 29 },
	collides: ig.Entity.COLLIDES.NEVER,
	checkAgainst: ig.Entity.TYPE.A,
	animSheet: new ig.AnimationSheet( 'media/healthPowerUp.png', 29, 29 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		/* Define the animation set */
		this.addAnim( 'idle', 1, [0] );
		
		var currTile = this.getCurrentTile();
		
		if( !this.canBeHere( currTile.x, currTile.y ) )
		{
			ig.game.currentNumberOfPowerUps = ig.game.currentNumberOfPowerUps - 1;
			this.kill();
		}
	},
	
	update: function() {
		this.parent();
	},
	
	canBeHere: function(tileX, tileY) {
		return ig.game.collisionMap.data[tileY][tileX] === 0;
	},
	
	getCurrentTile: function() {
		var tilesize = ig.game.collisionMap.tilesize;
		var tileX = this.pos.x / tilesize;
		var tileY = this.pos.y / tilesize;
			return { x: tileX, y: tileY };
	},
	
	check: function( tank ) {
		this.parent();
		
		/* Register the power up for the tank that picked it up */
			this.kill();
			tank.receiveDamage(-10);
			ig.game.currentNumberOfPowerUps = ig.game.currentNumberOfPowerUps - 1;
	}
});

});