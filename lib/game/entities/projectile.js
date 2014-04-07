ig.module(
	'game.entities.projectile'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityProjectile = ig.Entity.extend({

	/* A few variables */
	size: { x: 4, y: 4 },
	collides: ig.Entity.COLLIDES.NEVER,
	checkAgainst: ig.Entity.TYPE.A,
	animSheet: new ig.AnimationSheet( 'media/projectile.png', 4, 4 ),
	shootSound: new ig.Sound( 'media/shoot_projectile.ogg' ),
	pausedX: null,
	pausedY: null,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		if( ig.game.playSound )
		{
			this.shootSound.play();
		}
		
		/* Define the animation set */
		this.addAnim( 'seeking', 1, [0] );
		
		/* Shoot Left */
		if( settings.direction == ig.game.facing.left ) {
			this.vel.x = -100;
			this.vel.y = 0;
		}
		
		/* Shoot Up */
		else if( settings.direction == ig.game.facing.up ) {
			this.vel.x = 0;
			this.vel.y = -100;
		}
		
		/* Shoot Down */
		else if( settings.direction == ig.game.facing.down ) {
			this.vel.x = 0;
			this.vel.y = 100;
		}
		
		/* Shoot Right */
		else if( settings.direction == ig.game.facing.right ) {
			this.vel.x = 100;
			this.vel.y = 0;
		}
		
	},
	
	update: function() {
		this.parent();
		
		/* Paused State */
		if( ig.game.paused && (this.vel.x != 0 || this.vel.y != 0) )
		{
			this.pausedX = this.vel.x;
			this.pausedY = this.vel.y;
			
			this.vel.x = 0;
			this.vel.y = 0;
		}
		
		/* Uspause */
		else if ( (!ig.game.paused) && (this.vel.x == 0 && this.vel.y == 0) )
		{
			this.vel.x = this.pausedX;
			this.vel.y = this.pausedY;
		}
		
	},
	
	handleMovementTrace: function( res ) {
		/* Remove the projectile from the level if it hits the wall
		 * If not, they pile up on the screen!
		*/
		if( res.collision.y || res.collision.x ) {
			this.kill();
		}

		this.parent(res); 
	},
	
	check: function( tank ) {
		this.parent();
		
		/* Register the damage if the projectile hit another tank */
		if( this.whoShotThis != tank.whoIsThis )
		{
			this.kill();
			tank.receiveDamage(5);
		}
	}
});

});