importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/static/app.bc798ae3490ce517eaac.js",
    "revision": "74b33863492cd80d5218e687fa7919de"
  },
  {
    "url": "/static/common.0071345a9e5d20745597f07459e9c6d9.css",
    "revision": "f68114780e628c8ec14e1622b8b122b1"
  },
  {
    "url": "/static/common.9396938a0726764d8635.js",
    "revision": "c875121e5108eb73ad78602a0a067d90"
  },
  {
    "url": "/static/layouts/component.ff87cc46a5134c421941.js",
    "revision": "5bfcc27f7f4d94d9bdbf1f61982199f0"
  },
  {
    "url": "/static/layouts/default.3483bedc0c07e4f8bcd9.js",
    "revision": "edf27977e2f21a14c4765e1dff2a1ce3"
  },
  {
    "url": "/static/layouts/index.136bf50cb18dde51b474.js",
    "revision": "cc32ff3ceb3ee06d9d341d9c990d5de9"
  },
  {
    "url": "/static/layouts/principle.8220320564e2973c833c.js",
    "revision": "412c45bf332c7aade65d6206ba9f40a0"
  },
  {
    "url": "/static/manifest.a7d6597e3bb6be79a66e.js",
    "revision": "48ed8392d171490f87898d9863083acd"
  },
  {
    "url": "/static/pages/component\\button-group.92f04b57ff1388d69c25.js",
    "revision": "cf18d59b73c496d199726ca088b2e504"
  },
  {
    "url": "/static/pages/component\\button.941ecf620f89512e957f.js",
    "revision": "4239e4523fc3707d0e26793dc1351c0e"
  },
  {
    "url": "/static/pages/component\\checkbox.abc1b3bf50c500b78ba9.js",
    "revision": "0722454a06950c1c5b12fd653b3f0473"
  },
  {
    "url": "/static/pages/component\\icon.2efc3dd0a2d41c2d48fd.js",
    "revision": "fb7cb6713629ba769aab99060ad7c0fb"
  },
  {
    "url": "/static/pages/component\\install.3d7feb4bb2d6da5f46c5.js",
    "revision": "ac131a6c4959c9cb75cdbfc9767976a1"
  },
  {
    "url": "/static/pages/component\\theme.1bcdd3916745ce08a271.js",
    "revision": "8b353c4d63a28a019bf45f5c6014f888"
  },
  {
    "url": "/static/pages/component\\toolbar.89027eab479e5ffd0069.js",
    "revision": "ae91722d8949ff36bc7ecd4f18e6969b"
  },
  {
    "url": "/static/pages/index.7097731261307c755187.js",
    "revision": "9762d47bce462d0196d7389e756011fb"
  },
  {
    "url": "/static/pages/principle\\guides.bf1301b55cb03662b6e7.js",
    "revision": "c59f006715feae58185e62f72a0b58a9"
  },
  {
    "url": "/static/pages/principle\\introduction.8a65488fa00577423b0c.js",
    "revision": "02c725a3949d3b86204869db48c85ed9"
  },
  {
    "url": "/static/pages/resource.dea68e86905dab0b92a7.js",
    "revision": "cadf6a82eb3ee06a14701c372784d0a0"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "clair_0.1.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/static/**', workboxSW.strategies.cacheFirst({}), 'GET');
