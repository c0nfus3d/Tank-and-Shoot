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
    'game.main'
)
.requires(
    'impact.game',
	'game.entities.projectile',
    'impact.font',
    'game.levels.level1'
)
.defines(function(){

TankAndShootGame = ig.Game.extend({

    /* Load a font */
    font: new ig.Font( 'media/04b03.font.png' ),
	
	/* A few variables */
	gameOver: false,
	player: null,
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
		ig.input.bind(ig.KEY.R, 'restart');

        /* Load level */
        this.loadLevel(LevelLevel1);
    },
	
	update: function() {
		this.parent();

		/* Follow the player */
		if( ig.game.getEntitiesByType( EntityPlayer )[0] ) {
			this.screen.x = ig.game.getEntitiesByType( EntityPlayer )[0].pos.x - ig.system.width/2;
			this.screen.y = ig.game.getEntitiesByType( EntityPlayer )[0].pos.y - ig.system.height/2;
		}
		
		/* Game Over */
		if( this.gameOver ) {
			if( ig.input.pressed('restart') ) ig.system.setGame( TankAndShootGame );;
			return;
		}
	},

    draw: function() {
        this.parent();
		
        /* Print Initial Direction and Health */
        var x = ig.system.width/2;
        var y = ig.system.height - this.font.height - 8;
        this.font.draw( 'Use the ARROW KEYS to move around.\nPress SPACE to fire.', x, y, ig.Font.ALIGN.CENTER );
		this.updateHealth();
    },
	
	updateHealth: function() {
		/* Game Over */
		if( this.gameOver ) {
			ig.system.clear('#000');
			this.font.draw( 'GAME OVER', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
			this.font.draw( '\n\n Press R to retry.', ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER );
		}
		
		/* Update Health */
		else {
			this.font.draw( 'Player Health: ' + ig.game.getEntitiesByType( EntityPlayer )[0].health, 0, 0 );
			this.font.draw( 'Enemy Health: ' + ig.game.getEntitiesByType( EntityEnemy )[0].health, 0, 10 );
		}
	}
});

ig.main( '#canvas', TankAndShootGame, 60, 320, 240, 2 );

});
