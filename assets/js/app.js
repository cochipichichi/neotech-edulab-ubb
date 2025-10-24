
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];

function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta){ meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()); }
}
function initTheme(){
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
}
function toggleThemeMenu(){
  const p = qs('.theme-pop'); p.style.display = p.style.display==='block' ? 'none' : 'block';
}
document.addEventListener('click', (e)=>{
  const p = qs('.theme-pop');
  if(!p) return;
  if(!e.target.closest('.theme-menu')) p.style.display='none';
});

function registerPWA(){
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('/service-worker.js'); }
}

window.addEventListener('DOMContentLoaded', ()=>{
  initTheme(); registerPWA();
  qsa('.btn, .card, .ripple').forEach(el=>{
    el.addEventListener('mouseenter', ()=> el.style.transform = 'translateY(-2px) scale(1.01)');
    el.addEventListener('mouseleave', ()=> el.style.transform = '');
  });
});
