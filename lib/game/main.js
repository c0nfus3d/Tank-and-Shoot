/* Tank and Shoot
 * @author Josh Richard <http://www.joshrichard.net>
 * @license Apache, Version 2.0
 */

ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.levels.level1',
	'game.entities.projectile',
	'game.entities.powerup_health',
	'game.plugins.preloader',
	'game.plugins.HealthBar',
	'game.plugins.button'
)
.defines(function(){

TankAndShootGame = ig.Game.extend({

    /* Load a font */
    font: new ig.Font( 'media/04b03.font.png' ),
	
	/* A few variables */
	maxNumberOfPowerUpsAtOnce: 4,
	currentNumberOfPowerUps: 0,
	maxTimeBetweenPowerUps: 45,
	gameOver: false,
	paused: false,
	playSound: true,
	player: null,
	gameState: 'mainmenu',
	gameMode: 'easy',
	gameWon: false,
	secondsBeforeNextPowerUp: null,
	facing: {
		'up': 1,
		'down': 2,
		'left': 4,
		'right': 8
	},

    init: function() {
        /* Bind keys */
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.W, 'up');
        ig.input.bind(ig.KEY.S, 'down');
        ig.input.bind(ig.KEY.A, 'left');
        ig.input.bind(ig.KEY.D, 'right');
		ig.input.bind(ig.KEY.SPACE, 'action');
		ig.input.bind(ig.KEY.ENTER, 'select');
		ig.input.bind(ig.KEY.R, 'restart');
		ig.input.bind(ig.KEY.P, 'pause');
		ig.input.bind(ig.KEY.M, 'sound');
		
		this.MainMenu();
		this.powerUpTimer = new ig.Timer();
		this.secondsBeforeNextPowerUp = Math.floor(Math.random() * this.maxTimeBetweenPowerUps);
		
    },
	
	update: function() {
		this.parent();
		
		/* Toggle Sounds */
		if( ig.input.pressed('sound') )
		{
			ig.game.playSound = false;
		}
		
		/* Game Over */
		if( this.gameOver || this.gameWon ) {
			if( ig.input.pressed('restart') ) ig.system.setGame( TankAndShootGame );
		}
		
		/* Main Menu Selection */
		if( this.gameState == 'mainmenu' ) {
			if( ig.input.pressed('action') || ig.input.pressed('select') )
			{
				for( var x = 0; x < ig.game.getEntitiesByType( Button ).length; x++ )
				{
					if( ig.game.getEntitiesByType( Button )[x].state == 'active' )
					{
						ig.game.getEntitiesByType( Button )[x].optionSelected();
							break;
					}
				}
			}
		
			if( ig.input.pressed('down') )
			{
				for( var x = 0; x < ig.game.getEntitiesByType( Button ).length; x++ )
				{
					if( ig.game.getEntitiesByType( Button )[x].state == 'active' )
					{
						if( !ig.game.getEntitiesByType( Button )[x+1] )
						{
							ig.game.getEntitiesByType( Button )[x].state == 'idle';
							ig.game.getEntitiesByType( Button )[x].setState( 'idle' );
							ig.game.getEntitiesByType( Button )[0].state == 'active';
							ig.game.getEntitiesByType( Button )[0].setState( 'active' );
						}					
						else
						{
							ig.game.getEntitiesByType( Button )[x].state == 'idle';
							ig.game.getEntitiesByType( Button )[x].setState( 'idle' );
							ig.game.getEntitiesByType( Button )[x+1].state == 'active';
							ig.game.getEntitiesByType( Button )[x+1].setState( 'active' );
						}
							break;
					}
				}
			}
			else if( ig.input.pressed('up') )
			{
				for( var x = 0; x < ig.game.getEntitiesByType( Button ).length; x++ )
				{
					if( ig.game.getEntitiesByType( Button )[x].state == 'active' )
					{
						if( !ig.game.getEntitiesByType( Button )[x-1] )
						{
							ig.game.getEntitiesByType( Button )[x].state == 'idle';
							ig.game.getEntitiesByType( Button )[x].setState( 'idle' );
							ig.game.getEntitiesByType( Button )[ig.game.getEntitiesByType( Button ).length-1].state == 'active';
							ig.game.getEntitiesByType( Button )[ig.game.getEntitiesByType( Button ).length-1].setState( 'active' );
						}					
						else
						{
							ig.game.getEntitiesByType( Button )[x].state == 'idle';
							ig.game.getEntitiesByType( Button )[x].setState( 'idle' );
							ig.game.getEntitiesByType( Button )[x-1].state == 'active';
							ig.game.getEntitiesByType( Button )[x-1].setState( 'active' );
						}
							break;
					}
				}
			}
		}
		
		/* In Game Actions */
		if( !this.paused && !this.gameOver && !this.gameWon && this.gameState != 'mainmenu' )
		{
			/* Power Ups */
			if( this.currentNumberOfPowerUps < this.maxNumberOfPowerUpsAtOnce && this.powerUpTimer.delta() >= ig.game.secondsBeforeNextPowerUp )
			{
				this.powerUpTimer.reset();
				ig.game.secondsBeforeNextPowerUp = Math.floor(Math.random() * this.maxTimeBetweenPowerUps);
				
				var randomX = Math.floor( Math.random() * ( (ig.game.collisionMap.width - 1) - 0 + 1) + 0 );
				var randomY = Math.floor( Math.random() * ( (ig.game.collisionMap.height - 1) - 0 + 1) + 0 );
				
				randomX = randomX * ig.game.collisionMap.tilesize;
				randomY = randomY * ig.game.collisionMap.tilesize;
			
				//var randomChoice = Math.floor(Math.random()*2);
				var randomChoice = 0;
				
					if( randomChoice == 0 )
					{
						ig.game.spawnEntity( powerup_health, randomX, randomY );
					}
					
					this.currentNumberOfPowerUps = this.currentNumberOfPowerUps + 1;
			}
		
			/* Make the screen follow the player */
			if( ig.game.getEntitiesByType( EntityPlayer )[0] ) {
				this.screen.x = ig.game.getEntitiesByType( EntityPlayer )[0].pos.x - ig.system.width/2;
				this.screen.y = ig.game.getEntitiesByType( EntityPlayer )[0].pos.y - ig.system.height/2;
			}
		}
		
		/* All enemies destroyed */
		if( this.gameState != 'mainmenu' && typeof ig.game.getEntitiesByType( EntityEnemy )[0] == 'undefined' )
		{
			this.gameWon = true;
		}
		
		/* Player destroyed */
		if( this.gameState != 'mainmenu' && typeof ig.game.getEntitiesByType( EntityPlayer )[0] == 'undefined' )
		{
			this.gameOver = true;
		}

	},
	
	draw: function() {
		this.parent();
		
		/* Game Over */
		if( this.gameOver )
		{
			ig.system.clear('#000');
			this.font.draw( 'GAME OVER', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
			this.font.draw( '\n\n Press R to retry.', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
		}
		
		/* Game Won */
		if( this.gameWon )
		{
			ig.system.clear('#000');
			this.font.draw( 'YOU WIN!', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
			this.font.draw( '\n\n Press R to retry.', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
		}
	
		/* Display Paused Message */
		if( this.paused )
		{
            this.font.draw(" - Paused - ", ig.system.width/2, 232, ig.Font.ALIGN.CENTER);               
        }
		
		/* Display Paused Message */
		if( this.gameState == 'mainmenu' )
		{
            this.font.draw("Tank and Shoot", ig.system.width/2, 25, ig.Font.ALIGN.CENTER);
			this.font.draw("Use the ARROW keys or WASD to move around.", ig.system.width/2, 190, ig.Font.ALIGN.CENTER);
			this.font.draw("Use the SPACE bar to fire your main cannon.", ig.system.width/2, 200, ig.Font.ALIGN.CENTER);
			this.font.draw("Press P to pause game play and M to toggle sounds.", ig.system.width/2, 210, ig.Font.ALIGN.CENTER);
        }
		
	},
	
	/* Main Menu Screen */
	MainMenu: function() {
		ig.game.gameState = 'mainmenu';
		ig.game.spawnEntity( Button, ig.system.width / 2 - 35, 75, {
			text: [ 'Easy' ],
			textPos: { x: 37, y: 9 },
			textAlign: ig.Font.ALIGN.CENTER,
			state: 'active',
			size: { x: 150, y: 45 },
				optionSelected: function() {
					ig.game.gameMode = 'easy';
					ig.game.levelOne();
				}
		});
		
		ig.game.spawnEntity( Button, ig.system.width / 2 - 35, 100, {
			text: [ 'Medium' ],
			textPos: { x: 37, y: 9 },
			textAlign: ig.Font.ALIGN.CENTER,
			size: { x: 150, y: 45 },
				optionSelected: function() {
					ig.game.gameMode = 'medium';
					ig.game.levelOne();
				}
		});
		
		ig.game.spawnEntity( Button, ig.system.width / 2 - 35, 125, {
			text: [ 'Hard' ],
			textPos: { x: 37, y: 9 },
			textAlign: ig.Font.ALIGN.CENTER,
			size: { x: 150, y: 45 },
				optionSelected: function() {
					ig.game.gameMode = 'hard';
					ig.game.levelOne();
				}
		});
	},
	
	/* Load Level One */
	levelOne: function() {
		ig.game.gameState = 'levelOne';
		ig.game.loadLevel(LevelOne);
		
		if ( ig.game.gameMode == 'easy' )
		{
			ig.game.spawnEntity( EntityEnemy, 468, 324 );
		}
		else if ( ig.game.gameMode == 'medium' )
		{
			ig.game.spawnEntity( EntityEnemy, 468, 324 );
			ig.game.spawnEntity( EntityEnemy, 468, 84 );
		}
		else if ( ig.game.gameMode == 'hard' )
		{
			ig.game.spawnEntity( EntityEnemy, 468, 324 );
			ig.game.spawnEntity( EntityEnemy, 468, 84 );
			ig.game.spawnEntity( EntityEnemy, 84, 324 );
		}
	},
	
});

ig.main( '#canvas', TankAndShootGame, 60, 320, 240, 2, ig.ImpactSplashLoader );

});
