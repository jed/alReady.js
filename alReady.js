alReady = function( n, t, ready ) {
  ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
  
  document.addEventListener && document.addEventListener( "DOMContentLoaded", ready, false )
  
  !function check() {
    ready && setTimeout( /^u|g$/.test( document.readyState ) ? check : ready, t *= 2 )
  }()

  return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
}( 0, 1 )