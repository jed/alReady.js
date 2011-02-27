alReady = function( n, t, ready ) {
  // when ready, call any listeners, and then dereference the list
  ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
  
  // optimistically call addEventListener for modern browsers...
  document.addEventListener && document.addEventListener( "domContentLoaded", ready, false )
  
  // ...but if readyState exists, poll it just in case with back-off
  document.readyState && function check() {
    // try again if document.readyState contains `in`, otherwise call ready
    ready && setTimeout( ~document.readyState.indexOf( "in" ) ? check : ready, t *= 2 )
  }()

  // call fn immediately if ready has fired, otherwise queue it
  return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
}( 0, 1 )