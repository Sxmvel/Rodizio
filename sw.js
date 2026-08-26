const CACHE = 'rodizio-v3';

const CONCHA = [
  './',
  './index.html',
  './manifest.webmanifest',

  './src/app.js',
  './src/nucleo/cores.js',
  './src/nucleo/desenhos.js',
  './src/nucleo/dom.js',
  './src/nucleo/estado.js',
  './src/nucleo/trava-tela.js',
  './src/telas/inicio/inicio.js',
  './src/telas/contador/contador.js',
  './src/telas/resumo/resumo.js',

  './src/estilos/tokens.css',
  './src/estilos/fontes.css',
  './src/estilos/base.css',
  './src/estilos/botoes.css',
  './src/telas/inicio/inicio.css',
  './src/telas/contador/contador.css',
  './src/telas/resumo/resumo.css',

  './ativos/fontes/Fredoka-latin.woff2',
  './ativos/fontes/LuckiestGuy-latin.woff2',
  './ativos/icones/icone.svg',
  './ativos/icones/icone-192.png',
  './ativos/icones/icone-512.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CONCHA))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(
        nomes.filter(n => n !== CACHE).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    ev.respondWith(
      caches.match('./index.html').then(r => r || fetch(req))
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(cacheado => {
      if (cacheado) return cacheado;
      return fetch(req).then(resp => {
        if (resp.ok && new URL(req.url).origin === location.origin) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return resp;
      });
    })
  );
});
