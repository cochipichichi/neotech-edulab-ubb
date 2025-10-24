async function loadData(){const r=await fetch('../assets/data/convocatorias.json');return r.json();}
function match(item, q){if(!q) return true; const t=q.toLowerCase();
  return [item.fuente,item.instrumento,item.region,item.estado,item.resumen,(item.tags||[]).join(' ')].join(' ').toLowerCase().includes(t);
}
function after(dateStr, fromStr){ if(!fromStr) return true; return new Date(dateStr) >= new Date(fromStr); }
function render(rows){
  const tb=document.querySelector('#tbl tbody'); tb.innerHTML='';
  rows.forEach(x=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${x.fuente}</td><td>${x.instrumento}</td><td>${x.region}</td><td>${x.estado}</td>
      <td>${x.cierra}</td><td><a class="btn ripple" href="${x.link}" target="_blank">🔗 Abrir</a></td>`;
    tb.appendChild(tr);
  });
}
function toCSV(rows){
  const cols=['id','fuente','instrumento','region','estado','cierra','link','resumen','tags'];
  const esc=v=>`"${String(v).replaceAll('"','""')}"`;
  const head=cols.join(','); const body=rows.map(r=>cols.map(c=>esc(c==='tags'?(r[c]||[]).join('|'):r[c]||'')).join(',')).join('\n');
  return head+'\n'+body;
}
async function main(){
  const data=await loadData();
  const $q=document.querySelector('#q'), $r=document.querySelector('#f-region'), $e=document.querySelector('#f-estado'), $d=document.querySelector('#f-desde');
  function apply(){ const q=$q.value, rg=$r.value, st=$e.value, ds=$d.value;
    const filtered=data.filter(x=>match(x,q) && (!rg||x.region===rg) && (!st||x.estado===st) && after(x.cierra, ds));
    render(filtered); return filtered;
  }
  document.querySelector('#btn-filtrar').addEventListener('click', apply);
  document.querySelector('#btn-export').addEventListener('click', ()=>{
    const rows=apply(); const csv=toCSV(rows);
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='convocatorias_filtradas.csv'; a.click();
  });
  render(data);
}
window.addEventListener('DOMContentLoaded', main);