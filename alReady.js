alReady = function( n, t, ready ) {
  ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
  
  document.addEventListener && document.addEventListener( "DOMContentLoaded", ready, false )
  
  document.readyState && function check() {
    ready && setTimeout( ~document.readyState.indexOf( "in" ) ? check : ready, t *= 2 )
  }()

  return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
}( 0, 1 )