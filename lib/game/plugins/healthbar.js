ig.module(
    'game.plugins.HealthBar'
)
.requires(
    'impact.game',
    'impact.entity',
    'impact.background-map'
)
.defines(function(){
 
EntityHealthBar = ig.Entity.extend({

    size: {x:32, y:5},
    animSheet: new ig.AnimationSheet( 'media/HealthBar.png', 32, 5 ),
    Unit:0,

    init: function( x, y, settings ) {
 
            this.addAnim( 'Full', 1, [0] );
            this.addAnim( 'Ninety', 1, [1] );
            this.addAnim( 'Eighty', 5, [2] );
            this.addAnim( 'Seventy', 1, [3] );
            this.addAnim( 'Sixty', 1, [4] );
            this.addAnim( 'Fifty', 1, [5] );
            this.addAnim( 'Fourty', 1, [6] );
            this.addAnim( 'Thirty', 1, [7] );
            this.addAnim( 'Twenty', 1, [8] );
            this.addAnim( 'Ten', 1, [9] );
            this.addAnim( 'NearDeath', 1, [10] );
 
            this.parent( x, y, settings );
            this.zIndex = 6;
    },
 
        update: function()
        {
        this.pos.x = this.Unit.pos.x-2;
        this.pos.y = this.Unit.pos.y-5;

        if(this.Unit.health == this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Full;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .9)
            && this.Unit.health < this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Ninety;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .8)
            && this.Unit.health < (this.Unit.MaxHealth * .9))
        {
            this.currentAnim = this.anims.Eighty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .7)
            && this.Unit.health < (this.Unit.MaxHealth * .8))
        {
            this.currentAnim = this.anims.Seventy;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .6)
            && this.Unit.health < (this.Unit.MaxHealth * .7))
        {
            this.currentAnim = this.anims.Sixty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .5)
            && this.Unit.health < (this.Unit.MaxHealth * .6))
        {
            this.currentAnim = this.anims.Fifty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .4)
            && this.Unit.health < (this.Unit.MaxHealth * .5))
        {
            this.currentAnim = this.anims.Fourty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .3)
            && this.Unit.health < (this.Unit.MaxHealth * .4))
        {
            this.currentAnim = this.anims.Thirty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .2)
            && this.Unit.health < (this.Unit.MaxHealth * .3))
        {
            this.currentAnim = this.anims.Twenty;
        }
        else if(this.Unit.health >= (this.Unit.MaxHealth * .1)
            && this.Unit.health < (this.Unit.MaxHealth * .2))
        {
            this.currentAnim = this.anims.Ten;
        }
        else if(this.Unit.health > 0
            && this.Unit.health < (this.Unit.MaxHealth * .1))
        {
            this.currentAnim = this.anims.NearDeath;
        }
        else if (this.Unit.health <= 0 )
        {
            this.kill();
        }
        }
 
});
 
});