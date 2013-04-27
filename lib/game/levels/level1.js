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

ig.module( 'game.levels.level1' )
.requires( 'impact.image','game.entities.player','game.entities.enemy' )
.defines(function(){
LevelLevel1=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":84,"y":84},{"type":"EntityEnemy","x":468,"y":324}],"layer":[{"name":"background","width":20,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"media/tileset.png","repeat":false,"preRender":false,"distance":"1","tilesize":29,"foreground":false,"data":[[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],[3,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],[3,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,3],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]]},{"name":"collision","width":20,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":29,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelLevel1Resources=[new ig.Image('media/tileset.png')];
});