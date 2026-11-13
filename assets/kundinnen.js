/* Kundinnen-Ergebnisse für Anmelde- und Aufzeichnungsseite. Hier pflegen, beide Seiten übernehmen es.
   bild:  Foto der Kundin (Perspective/imgix-Link oder Datei in img/)
   video: Einbettungs-Link eines Testimonial-Videos (optional, dann erscheint ein Play-Knopf)
   hl:    Teil des Zitats, der hervorgehoben wird
   tag:   kurzes Etikett über dem Titel. Keine Einkommenszahlen. */
window.KUNDINNEN=[
  {name:'Simone',rolle:'Closerin',tag:'Von 0 auf über 60 %',zitat:'Meine Abschlussrate stieg von null auf über 60 Prozent.',hl:'über 60 Prozent',titel:'Wie Simone ihre Abschlussrate von null auf über 60 Prozent gebracht hat',bild:'https://perspective.imgix.net/6aa19f899bf0440a182a831c.png',video:''},
  {name:'Nadin',rolle:'Closerin',tag:'Mehr Sicherheit',zitat:'Sarah hat mir die Sicherheit gegeben, die mir gefehlt hat.',hl:'Sicherheit',titel:'Wie Nadin im Vertrieb die Sicherheit gefunden hat, die ihr gefehlt hat',bild:'https://perspective.imgix.net/6aa19f35df42176567964df0.png',video:''},
  {name:'Laura',rolle:'Unternehmensberaterin',tag:'Authentisch verkaufen',zitat:'Ich verkaufe heute authentisch.',hl:'authentisch',titel:'Wie Laura verkauft, ohne sich wie eine Verkäuferin zu fühlen',bild:'https://perspective.imgix.net/6aa19ec39bf0440a182a80eb.png',video:''},
  {name:'Tina',rolle:'Closerin',tag:'Klarheit statt mehr Aufwand',zitat:'Gebraucht hätte ich Klarheit.',hl:'Klarheit',titel:'Wie Tina aufgehört hat, immer mehr zu machen, und heute führt',bild:'https://perspective.imgix.net/6aaf095243ae1667292c4243.png',video:''}
];

window.zeigeKundinnen=function(el){
  if(!el)return;
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var K=window.KUNDINNEN||[];
  el.innerHTML=K.map(function(k,i){
    var z=esc(k.zitat); if(k.hl)z=z.replace(esc(k.hl),'<mark>'+esc(k.hl)+'</mark>');
    var src=k.bild?(k.bild+(k.bild.indexOf('imgix')>-1&&k.bild.indexOf('?')<0?'?auto=compress%2Cformat&fit=crop&crop=faces&w=520&h=520':'')):'';
    var img=src?'<img src="'+esc(src)+'" alt="'+esc(k.name)+'" loading="lazy" onerror="this.remove()">':'';
    var play=k.video?'<button type="button" class="play" data-k="'+i+'" aria-label="Video von '+esc(k.name)+' abspielen"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"></path></svg></button>':'';
    return '<div class="res"><div class="res-img">'+img+'<div class="res-q">„'+z+'“</div>'+play+'</div><div class="res-b"><span class="tag">'+esc(k.tag)+'</span><div class="res-t">'+esc(k.titel)+'</div><div class="res-r">'+esc(k.name)+' · '+esc(k.rolle)+'</div></div></div>';
  }).join('');
  el.addEventListener('click',function(e){
    var b=e.target.closest('.play'); if(!b)return; var k=K[+b.getAttribute('data-k')];
    var f=document.createElement('iframe');f.src=k.video;f.title='Erfahrung von '+k.name;f.allow='autoplay; fullscreen';f.allowFullscreen=true;
    f.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;z-index:5';
    b.parentNode.appendChild(f); b.remove();
  });
};
