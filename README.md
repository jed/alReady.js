alReady.js
==========

alReady.js is a terse, embeddable, and cross-browser `DOMContentLoaded` implementation. It aims to hit a sweet spot in the tradeoff between size and embeddability on one side, and browser compatibility on the other.

## Features

* **Terse**: alReady.js contains just over 200 bytes after closure minification and gzipping.

* **Embeddable**: alReady.js has no dependencies, and can be dropped as-is into your own code or library.

* **Cross-browser**: alReady.js will work in any web browser. 

## Background

alReady.js was inspired by [this tweet](http://twitter.com/ded/status/40678627645333504) from Twitter's [Dustin Diaz](http://twitter.com/ded/), which started a mad round of code-golfing from a bunch of folks that follow Dustin, ending in [this genius 60-byte implementation](http://twitter.com/tobie/status/40744285489856512) from [Tobie Langel](http://twitter.com/tobie/):

    function r(f){setTimeout(/in/(document.readyState)?f:r,9,f)}
    
Unfortunately, a bunch of things prevent this from being usable on the real web, including the fact that Firefox 3.5 and earlier has no `document.readyState` property to check, and that Internet Explorer doesn't support additional arguments in `setTimeout` (in IE, the third argument specifies -- get this -- the name of the language used: `JScript`, `VBScript`, or `JavaScript`).

Dustin blogged about [his end solution](http://www.dustindiaz.com/smallest-domready-ever/), working it into his [$script.js library](https://github.com/polvero/script.js), but I wanted something more embeddable, so I went in a different direction, trying backoff polling and other cross-browser methods.

Eventually, [John-David Dalton](http://twitter.com/jdalton/) pointed me to [Diego Perini](http://twitter.com/diegoperini/)'s [implementation](https://github.com/dperini/ContentLoaded), from which the current version is largely inspired. The biggest difference is that `alReady.js` is much smaller at just over 200 gzipped bytes, and does not optimize on edge cases for soon-to-be-negligible versions of IE.

## API

### alReady( callback )

`callback` is guaranteed to be called once and only once. Use `alReady.call( window, callback )` to specify the window of the document to be checked.

If the document has already loaded, `callback` is called immediately. Otherwise, `callback` is bound to the window's `load` event and document's `DOMContentLoaded` and `readystatechange` events, and is called when the first one occurs.

Otherise

## Contributors/Inspirers

* [Dustin Diaz](http://twitter.com/ded/)
* [Tobie Langel](http://twitter.com/tobie/)
* [John-David Dalton](http://twitter.com/jdalton/)
* [Diego Perini](http://twitter.com/diegoperini/)

## Feedback

Send any questions or comments [here](http://twitter.com/jedschmidt).

Copyright
---------

Copyright (c) 2011 Jed Schmidt. See LICENSE.txt for details.