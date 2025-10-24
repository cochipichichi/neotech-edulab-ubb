self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('neotech-v1').then(c=>c.addAll([
    '/index.html','/assets/css/style.css','/assets/js/app.js','/manifest.webmanifest'
  ])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
