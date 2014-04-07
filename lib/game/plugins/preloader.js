ig.module(
    'game.plugins.preloader'
)
.requires(
    'impact.loader'
)
.defines(function(){

ig.ImpactSplashLoader = ig.Loader.extend({
    
    endTime: 0,
    fadeToWhiteTime: 1000,
    fadeToGameTime: 1500,
    
    end: function() {
        this.parent();
        this.endTime = Date.now();
        ig.system.setDelegate( this );
    },
    run: function() {    
        var t = Date.now() - this.endTime;
        var alpha = 1;
        if( t < this.fadeToWhiteTime ) {
            this.draw();
            alpha = t.map( 0, this.fadeToWhiteTime, 0, 1);
        }
        else if( t < this.fadeToGameTime ) {
            ig.game.run();
            alpha = t.map( this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
        }
        else {
            ig.system.setDelegate( ig.game );
            return;
        }
        ig.system.context.fillStyle = 'rgba(0,0,0,'+alpha+')';
        ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
    },
    
    
    draw: function() {
        this.parent();
        var ctx = ig.system.context;
        var image = new Image();
        image.src = "http://theyconfuse.me/lib/images/logo.png";
        
        ctx.drawImage(image, (ig.system.realWidth-300)/2, ig.system.realHeight/5);
    }
});
});