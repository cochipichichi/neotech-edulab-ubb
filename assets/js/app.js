const qs=s=>document.querySelector(s);const qsa=s=>[...document.querySelectorAll(s)];
function setTheme(theme){document.documentElement.setAttribute('data-theme', theme);localStorage.setItem('theme', theme);
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta){ meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()); }}
function initTheme(){ setTheme(localStorage.getItem('theme') || 'dark'); }
function toggleThemeMenu(){ const p=qs('.theme-pop'); p.style.display = p.style.display==='block' ? 'none' : 'block'; }
document.addEventListener('click', (e)=>{ const p=qs('.theme-pop'); if(!p) return; if(!e.target.closest('.theme-menu')) p.style.display='none'; });
function registerPWA(){ if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js'); } }
window.addEventListener('DOMContentLoaded', ()=>{ initTheme(); registerPWA(); });