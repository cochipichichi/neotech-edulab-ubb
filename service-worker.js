const CACHE='neotech-v1.1.2';
const ASSETS=['index.html','assets/css/style.css','assets/js/app.js','assets/js/convocatorias.js',
'pages/onepagers.html','pages/legal.html','pages/agenda.html','pages/checklist.html','pages/pitch.html','pages/convocatorias.html','pages/admin.html',
'assets/data/convocatorias.json','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return res;})).catch(()=>caches.match('index.html')))});