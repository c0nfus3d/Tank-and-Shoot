ig.module('game.entities.enemy')
.requires('impact.entity')
.defines(function() {

EntityEnemy = ig.Entity.extend({

	/* Some variables */
	speed: 15,
	collides: ig.Entity.COLLIDES.ACTIVE,
	health: 100,
	MaxHealth: 100,
	size: { x: 29, y: 29 },
	moveIntention: null,
	facing: 8,
	isMoving: false,
	whoIsThis: 'enemy',
	hitWall: false,
	type: ig.Entity.TYPE.A,
	shootDelayInSeconds: 1,
	animSheet: new ig.AnimationSheet( 'media/enemy.png', 29, 29 ),
	
	/* Define the Enemy */
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		/* Enemy Animation Set */
		this.addAnim( 'idle_left', 1, [7] );
		this.addAnim( 'idle_right', 1, [8] );
		this.addAnim( 'idle_up', 1, [72] );
		this.addAnim( 'idle_down', 1, [17] );
		this.addAnim( 'left', 0.1, [0, 1, 2, 3, 4, 5, 6, 7] );
		this.addAnim( 'right', 0.1, [15, 14, 13, 12, 11, 10, 9, 8] );
		this.addAnim( 'up', 0.1, [16, 24, 32, 40, 48, 56, 64, 72] );
		this.addAnim( 'down', 0.1, [73, 65, 57, 49, 41, 33, 25, 17] );
		
		/* Add Health Bar */
		if( !ig.global.wm )
        {
        ig.game.spawnEntity(EntityHealthBar,this.pos.x , this.pos.y,{ Unit: this });
        }

		/* Set speed as the max velocity */
		this.maxVel.x = this.maxVel.y = this.speed;
	},
		
	/* In game actions */
	update: function() {
		this.parent();
		
		/* Paused State */
		if( ig.game.paused )
		{
			this.stopMoving();
		}
		
		if( !ig.game.gameOver && !ig.game.paused ) {
		/*************************************************************************************
		 * Turn and move to follow or shoot the player
		 * - Does not continue trying to move if touching the player
		 * - Remains a predefined distance from the player, so it doesn't crowd the player if needed
		 * - Has a 5px margin for error because with out it, the enemy tank does not stop moving
		 *************************************************************************************/
		this.moveIntention = null;
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		var tilesize = ig.game.collisionMap.tilesize + 5;
		var tilesToStayFromPlayer = 1;
		var tileDistance = tilesToStayFromPlayer * tilesize;
		
			if ( (!this.touches(player) && this.distanceTo(player) > tileDistance) && (player.pos.x - 5 > this.pos.x) && (this.hitWall != ig.game.facing.right) )
			{
				this.facing = this.moveIntention = ig.game.facing.right;
				this.currentAnim = this.anims.right;
			
				this.moveEntity( this.moveIntention );
				
				/***
				 * Move and shoot if straight on with the player
				 */
				 if( (player.pos.y + 12 > this.pos.y && player.pos.y - 12 < this.pos.y) )
				 {
					this.fireAtWill();
				 }
			}
			else if ( (!this.touches(player) && this.distanceTo(player) > tileDistance) && (player.pos.x + 5 < this.pos.x) && (this.hitWall != ig.game.facing.left) )
			{
				this.facing = this.moveIntention = ig.game.facing.left;
				this.currentAnim = this.anims.left;
			
				this.moveEntity( this.moveIntention );
				
				/***
				 * Move and shoot if straight on with the player
				 */
				 if( (player.pos.y + 12 > this.pos.y && player.pos.y - 12 < this.pos.y) )
				 {
					this.fireAtWill();
				 }
			}
			else if ( (!this.touches(player) && this.distanceTo(player) > tileDistance) && (player.pos.y - 5 > this.pos.y) && (this.hitWall != ig.game.facing.down) )
			{
				this.facing = this.moveIntention = ig.game.facing.down;
				this.currentAnim = this.anims.down;
			
				this.moveEntity( this.moveIntention );
				
				/***
				 * Move and shoot if straight on with the player
				 */
				 if( (player.pos.x + 12 > this.pos.x && player.pos.x - 12 < this.pos.x) )
				 {
					this.fireAtWill();
				 }
			}
			else if ( (!this.touches(player) && this.distanceTo(player) > tileDistance) && (player.pos.y + 5 < this.pos.y) && (this.hitWall != ig.game.facing.up) )
			{
				this.facing = this.moveIntention = ig.game.facing.up;
				this.currentAnim = this.anims.up;
			
				this.moveEntity( this.moveIntention );
				
				/***
				 * Move and shoot if straight on with the player
				 */
				 if( (player.pos.x + 12 > this.pos.x && player.pos.x - 12 < this.pos.x) )
				 {
					this.fireAtWill();
				 }
			}
			else
			{
				this.stopMoving();
				
				/***
				 * Make sure we are facing the player before shooting
				 */
				if( (player.pos.x - 5 > this.pos.x) && (player.pos.y + 12 > this.pos.y && player.pos.y - 12 < this.pos.y) )
				{
					this.facing = ig.game.facing.right;
					this.currentAnim = this.anims.idle_right;
				}
				else if( (player.pos.x + 5 < this.pos.x) && (player.pos.y + 12 > this.pos.y && player.pos.y - 12 < this.pos.y) )
				{
					this.facing = ig.game.facing.left;
					this.currentAnim = this.anims.idle_left;
				}
				else if( (player.pos.y - 5 > this.pos.y) && (player.pos.x + 12 > this.pos.x && player.pos.x - 12 < this.pos.x) )
				{
					this.facing = ig.game.facing.down;
					this.currentAnim = this.anims.idle_down;
				}
				else if( (player.pos.y - 5 < this.pos.y) && (player.pos.x + 12 > this.pos.x && player.pos.x - 12 < this.pos.x) )
				{
					this.facing = ig.game.facing.up;
					this.currentAnim = this.anims.idle_up;
				}
				
				this.fireAtWill();
			}
			
		}
	},
	
	fireAtWill: function() {
			if( !this.timer || this.timer.delta() > this.shootDelayInSeconds )
			{
				this.timer = new ig.Timer();
				ig.game.spawnEntity( EntityProjectile, this.pos.x + 12, this.pos.y + 10, { direction:this.facing, whoShotThis:this.whoIsThis } );
			}
	},
	
	handleMovementTrace: function( res ) {
		if( res.collision.y || res.collision.x ) {
			this.hitWall = this.facing;
		}
		else {
			this.hitWall = false;
		}

		this.parent(res);
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