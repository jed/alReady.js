alReady = function( fn ) {
  var add = "addEventListener"
    , win = this
    , doc = win.document
    , pre = doc[ add ] ? "" : "on";
    
  ~doc.readyState.indexOf( "m" ) ? fn() :

  "load DOMContentLoaded readystatechange".replace( /\w+/g, function( type, i ) {
    ( i ? doc : win )
      [ pre ? "attachEvent" : add ]
      (
        pre + type,
        function(){ if ( fn ) if ( i < 6 || ~doc.readyState.indexOf( "m" ) ) fn(), fn = 0 },
        !1
      )
  })
}