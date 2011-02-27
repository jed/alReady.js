alReady.js
==========

alReady.js is a terse, embeddable, and cross-browser `domContentLoaded` implementation. It aims to hit a sweet spot in the tradeoff between size and embeddability on one side, and browser compatibility on the other.

## Features

* **Terse**: alReady.js contains fewer than 200 bytes after closure minification and gzipping.

* **Embeddable**: alReady.js has no dependencies, and can be dropped as-is into your own code or library.

* **Cross-browser**: alReady.js will work in almost any web browser. 

## Background

alReady.js was inspired by [this tweet](http://twitter.com/ded/status/40678627645333504) from Twitter's [Dustin Diaz](http://twitter.com/ded/), with started a mad round of code-golfing from a bunch of folks following Dustin, ending in [this genius 60-byte implementation](http://twitter.com/tobie/status/40744285489856512) from [Tobie Langel](http://twitter.com/tobie/)

    function r(f){setTimeout(/in/(document.readyState)?f:r,9,f)}
    
Unfortunately, a bunch of things prevent this from being usable on the real web, including the fact that Firefox 3.5 and earlier have no `document.readyState` property to check, and that Internet Explorer doesn't support additional arguments in `setTimeout` (in IE, the third argument specifies -- get this -- the name of the language used: `JScript`, `VBScript`, or `JavaScript`).

Dustin blogged about [his end solution](http://www.dustindiaz.com/smallest-domready-ever/), working it into his [$script.js library](https://github.com/polvero/script.js), but I wanted something more embeddable, so I went in a different direction:

* Instead of detecting whether the `domContentLoaded` event exists, I bind to it anyway immediately, hoping for the best. If it exists, it's almost guaranteed to beat the fallback, which is that

* I also poll `document.readyState`, but using `String#indexOf` instead of `RegExp#test` on its value, and polling with back-off by doubling the interval on every call.

* I maintain a list of callbacks, as opposed to adding a new poller on every call, which could get expensive.

## API

### alReady( callback )

`callback` is guaranteed to be called once and only once.

If the document has already loaded, `callback` is called immediately.

Otherwise, it is added to a list of functions waiting for the DOM to be ready.

The DOM is determined to be ready when either the native `domContentLoaded` event occurs, or the `document.readyState` property is either `loaded` or `complete`, as determined by checking every 2 * _n_ milliseconds, where _n_ is the number of times the value has been polled.

## Feedback

Send any questions or comments [here](http://twitter.com/jedschmidt).

Copyright
---------

Copyright (c) 2011 Jed Schmidt. See LICENSE.txt for details.