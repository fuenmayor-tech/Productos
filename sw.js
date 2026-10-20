/* Exploradores tecnológicos: guarda la app en el dispositivo para usarla sin internet.
   Si cambias index.html o algún archivo de la app, sube el número de VERSION. */
var VERSION = 'v1';
var CACHE_APP = 'exploradores-app-' + VERSION;
var CACHE_MODELOS = 'exploradores-modelos'; // los modelos 3D no se borran al cambiar de versión

var ARCHIVOS_APP = [
  './',
  './index.html',
  './manifest.webmanifest',
  './lib/model-viewer.min.js',
  './lib/draco/draco_wasm_wrapper.js',
  './lib/draco/draco_decoder.wasm',
  './fonts/nunito-latin-wght-normal.woff2',
  './fonts/baloo-2-latin-700-normal.woff2',
  './fonts/baloo-2-latin-800-normal.woff2',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_APP).then(function (c) { return c.addAll(ARCHIVOS_APP); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.map(function (k) {
        if (k.indexOf('exploradores-app-') === 0 && k !== CACHE_APP) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function esModelo(url) { return /\.(glb|gltf|bin|ktx2|png|jpe?g|webp)$/i.test(url.pathname) && url.pathname.indexOf('/modelos/') !== -1; }

// Modelos 3D: primero el que está guardado; si no está, se descarga y se guarda.
function primeroGuardado(req) {
  return caches.match(req).then(function (guardado) {
    if (guardado) return guardado;
    return fetch(req).then(function (res) {
      if (res.ok) { var copia = res.clone(); caches.open(CACHE_MODELOS).then(function (c) { c.put(req, copia); }); }
      return res;
    });
  });
}

// Archivos de la app: responde con lo guardado al instante y actualiza en segundo plano.
function guardadoYActualizar(e, req, respaldo) {
  var red = fetch(req).then(function (res) {
    if (res.ok && res.type === 'basic') { var copia = res.clone(); caches.open(CACHE_APP).then(function (c) { c.put(req, copia); }); }
    return res;
  }).catch(function () { return null; });
  e.waitUntil(red.then(function () {}));
  return caches.match(req, { ignoreSearch: true }).then(function (guardado) {
    if (guardado) return guardado;
    return red.then(function (res) {
      if (res) return res;
      return respaldo ? caches.match(respaldo) : Response.error();
    }).then(function (res) { return res || Response.error(); });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (esModelo(url)) { e.respondWith(primeroGuardado(req)); return; }
  if (req.mode === 'navigate') { e.respondWith(guardadoYActualizar(e, req, './index.html')); return; }
  e.respondWith(guardadoYActualizar(e, req, null));
});
