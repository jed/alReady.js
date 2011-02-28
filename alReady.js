// trying a new tack, binding to a ton of events first
// HEAVILY inspired by diego perini's awesome attempt here:
// http://javascript.nwbox.com/ContentLoaded/

alReady = function( win, doc, add, remove, prefix, fns ) {
  doc[ add ] || ( add = "attachEvent", remove = "detachEvent", prefix = "on" )
  
  "load DOMContentLoaded readystatechange".replace( /\w+/g, function( type, el ) {
    ( el = el ? doc : win )[ add ]( prefix + type, function onready( e ) {
      if ( !fns || /^rea/.test( type ) && !/e$/.test( doc.readyState ) ) return
      
      el[ remove ]( prefix + type, onready, false )
      while ( fns[ 0 ] ) fns.shift()( e ), console.log(e)
      fns = 0
    }, false )
  })
  
  // TODO: add polling?

  return function( fn ){ fns ? fns.push( fn ) : fn() }
}(
  window,
  document,
  "addEventListener",
  "removeEventListener",
  "",
  []
)