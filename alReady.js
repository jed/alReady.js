// trying a new tack, binding to events first
// HEAVILY inspired by diego perini's awesome attempt here:
// http://javascript.nwbox.com/ContentLoaded/

alReady = function() {
  var events = [ "load", "DOMContentLoaded", "readystatechange" ]
    , els = [ window, document, document ]
    , i
    , n = 0

    , action = "addEventListener"
    , prefix = ""
    , w3c = document[ action ]

    , ready = function( e ) {
        if ( !ready || e.type == "readystatechange" && !/^c/.test( document.readyState ) ) return

        for ( i = 3; i--; ) els[ i ][ action ]( prefix + events[ i ], ready, false )
        for ( i = 0; i < n; ) ready[ i++ ]( e )
        ready = 0
      }
        
  if ( !w3c ) add = "attachEvent", prefix = "on"
  
  for ( i = 3; i--; ) els[ i ][ action ]( prefix + events[ i ], ready, false )
  action = w3c ? "removeEventListener" : "detachEvent"
  
  return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
}()