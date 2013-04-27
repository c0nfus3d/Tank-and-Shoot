/* Project Name:		Tank and Shoot
 * Author:				@c0nfus3d1
 * Website:				http://theyconfuse.me/
 *
 *************************************************************************
 * This file is part of Tank and Shoot.
 *
 *  Tank and Shoot is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Tank and Shoot is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Tank and Shoot.  If not, see <http://www.gnu.org/licenses/>.
 *************************************************************************
 */

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
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.shootSound.play();
		
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
		
		/* Register the damage if the missile hit the other player */
		if( this.whoShotThis != tank.whoIsThis )
		{
			this.kill();
			tank.receiveDamage(5);
			if( tank.health == 0 ) ig.game.gameOver = true;
			ig.game.updateHealth();
		}
	}
});

});