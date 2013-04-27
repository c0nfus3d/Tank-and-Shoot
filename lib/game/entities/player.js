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

ig.module('game.entities.player')
.requires('impact.entity')
.defines(function() {

EntityPlayer = ig.Entity.extend({

	/* Some variables */
	speed: 25,
	collides: ig.Entity.COLLIDES.ACTIVE,
	health: 100,
	size: { x: 29, y: 29 },
	moveIntention: null,
	facing: 4,
	isMoving: false,
	shootDelayInSeconds: 1,
	whoIsThis: 'player',
	type: ig.Entity.TYPE.A,
	animSheet: new ig.AnimationSheet( 'media/player.png', 29, 29 ),
	
	/* Define the Player */
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		/* Player Animation Set */
		this.addAnim( 'idle_left', 1, [7] );
		this.addAnim( 'idle_right', 1, [8] );
		this.addAnim( 'idle_up', 1, [72] );
		this.addAnim( 'idle_down', 1, [17] );
		this.addAnim( 'left', 0.1, [0, 1, 2, 3, 4, 5, 6, 7] );
		this.addAnim( 'right', 0.1, [15, 14, 13, 12, 11, 10, 9, 8] );
		this.addAnim( 'up', 0.1, [16, 24, 32, 40, 48, 56, 64, 72] );
		this.addAnim( 'down', 0.1, [73, 65, 57, 49, 41, 33, 25, 17] );

		/* Set speed as the max velocity */
		this.maxVel.x = this.maxVel.y = this.speed;
	},
		
	/* In game actions */
	update: function() {
		this.parent();

		if( !ig.game.gameOver ) {
		/* Turn and move based on input */
		this.moveIntention = null;
		if( ig.input.state('right') ) {
			this.facing = this.moveIntention = ig.game.facing.right;
			this.currentAnim = this.anims.right;
			
			this.moveEntity( this.moveIntention );
		}
		else if( ig.input.state('left') ) {
			this.facing = this.moveIntention = ig.game.facing.left;
			this.currentAnim = this.anims.left;
			
			this.moveEntity( this.moveIntention );
		}
		else if( ig.input.state('up') ) {
			this.facing = this.moveIntention = ig.game.facing.up;
			this.currentAnim = this.anims.up;
			
			this.moveEntity( this.moveIntention );
		}
		else if( ig.input.state('down') ) {
			this.facing = this.moveIntention = ig.game.facing.down;
			this.currentAnim = this.anims.down;
			
			this.moveEntity( this.moveIntention );
		}
		else
		{
			this.stopMoving();
		}
			
		/* Shoot Missile */
		if( ig.input.pressed('action') ) {
			if( !this.timer || this.timer.delta() > this.shootDelayInSeconds )
			{
				this.timer = new ig.Timer();
				ig.game.spawnEntity( EntityProjectile, this.pos.x + 12, this.pos.y + 10, { direction:this.facing, whoShotThis:this.whoIsThis } );
			}
		}
		}
	},
	
	/* Stop entity movement */
	stopMoving: function() {
		this.parent();
		
		if( this.isMoving )
		{
			this.vel.x = 0;
			this.vel.y = 0;
			
			if(this.facing == ig.game.facing.left) this.currentAnim = this.anims.idle_left;
			if(this.facing == ig.game.facing.right) this.currentAnim = this.anims.idle_right;
			if(this.facing == ig.game.facing.up) this.currentAnim = this.anims.idle_up;
			if(this.facing == ig.game.facing.down) this.currentAnim = this.anims.idle_down;
		}
	},
	
	/* Move the entity */
	moveEntity: function( direction ) {
		this.parent();
		
		this.isMoving = true;
		if( direction == ig.game.facing.right ) { this.vel.x = 100; this.vel.y = 0; }
		else if( direction == ig.game.facing.left ) { this.vel.x = -100; this.vel.y = 0; }
		else if( direction == ig.game.facing.up ) { this.vel.y = -100; this.vel.x = 0; }
		else if( direction == ig.game.facing.down ) { this.vel.y = 100; this.vel.x = 0; }
	}, 
	
});

});