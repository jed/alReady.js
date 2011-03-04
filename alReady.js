alReady = function( fn ) {
  var add = "addEventListener"
    , win = this
    , doc = win.document
    , pre = doc[ add ] ? "" : "on"

  "load DOMContentLoaded readystatechange".replace( /\w+/g, function( type, i ) {
    ( i ? doc : win )
      [ pre ? "attachEvent" : add ]
      (
        pre + type,
        function(){ if ( fn ) if ( i < 6 || /m/( doc.readyState ) ) fn(), fn = 0 },
        !1
      )
  })
}