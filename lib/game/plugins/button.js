ig.module(
  'game.plugins.button'
)
.requires(
  'impact.entity'
)
.defines(function() {
 
  Button = ig.Entity.extend({
    size: { x: 80, y: 40 },
    
    text: [],
    textPos: { x: 5, y: 5 },
    textAlign: ig.Font.ALIGN.LEFT,
    
    font: new ig.Font( 'media/04b03.font.png' ),
    animSheet: new ig.AnimationSheet( 'media/button.png', 75, 23 ),
    
    state: 'idle',
    
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'selected', 1, [2] );
      this.addAnim( 'active', 1, [2] );
	  
	  if( this.state == 'active' )
	  {
		this.setState( 'active' );
	  }
    },
    
    update: function() {
		this.parent();
    },
    
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();
 
        if ( this.font !== null ) {
			for ( var i = 0; i < this.text.length; i++ ) {
	          this.font.draw(
	            this.text[i],
	            this.pos.x + this.textPos.x - ig.game.screen.x,
	            this.pos.y + ((this.font.height + 2) * i) + this.textPos.y - ig.game.screen.y,
	            this.textAlign
	          );
	        }
				}
      }
    },
    
    setState: function( s ) {
      this.state = s;
      
      if ( this.state !== 'hidden' ) {
        this.currentAnim = this.anims[ this.state ];
      }
    },
	
  });
 
});