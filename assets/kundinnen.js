/* Kundinnen-Ergebnisse für Anmelde- und Aufzeichnungsseite. Hier pflegen, beide Seiten übernehmen es.
   wistia: Media-ID des Testimonial-Videos in Wistia (10 Zeichen, steht in der Einbettung unter embed/iframe/...).
           Das Video wird quadratisch (1:1) gezeigt und beim Abspielen auf das Quadrat zugeschnitten.
   bild:   Vorschaubild, quadratisch 1000x1000 (Wistia-Standbild mit image_crop_resized=1000x1000)
   dauer:  Länge des Videos für das Etikett oben rechts
   zitat:  wörtlich aus dem Video (Transkripte im Projekt-Doc "Testimonials – Transkripte im Wortlaut")
   hl:     Teil des Zitats, der hervorgehoben wird
   tag:    kurzes Etikett über dem Titel. Keine Einkommenszahlen. */
(function(){
  var W='https://embed-ssl.wistia.com/deliveries/';
  var Q='.jpg?image_crop_resized=1000x1000';
  window.KUNDINNEN=[
    {name:'Simone',rolle:'Closerin, Mentoring-Kundin',tag:'Von 0 auf über 60 %',
     zitat:'Closing darf weiblich sein. Ich muss nicht laut sein.',hl:'weiblich',
     titel:'Wie Simone ihre Abschlussrate in zwei Monaten von null auf über 60 Prozent gebracht hat',
     wistia:'r2dwvne7ij',bild:W+'ccec99a30dec6bd3a020722c023427a7a17894a7'+Q,dauer:'4:13'},
    {name:'Nadin',rolle:'Closerin, Mentoring-Kundin',tag:'Sicherheit statt Überforderung',
     zitat:'Sie ist soft, sie ist empathisch, aber sie ist so stark und so klar.',hl:'so klar',
     titel:'Wie Nadin aus der Überforderung zu Sicherheit im Vertrieb gefunden hat',
     wistia:'01ferdvedt',bild:W+'bfc10e320313b6de174b0c3dd1c481caf158696e'+Q,dauer:'3:55'},
    {name:'Tina',rolle:'Closerin, Mentoring-Kundin',tag:'Klarheit statt mehr Aufwand',
     zitat:'Ich übernehme die Führung. Ich halte mich nicht mehr klein.',hl:'die Führung',
     titel:'Wie Tina aufgehört hat, immer mehr zu machen, und heute im Gespräch führt',
     wistia:'fcuu983815',bild:W+'e7ab758a9430e3b5447112fdd8a4a27669e5f84b'+Q,dauer:'3:00'},
    {name:'Laura',rolle:'Unternehmerin, Auftraggeberin',tag:'Sarah im eigenen Vertrieb',
     zitat:'Man spürt bei ihr diese Energie, diese Power.',hl:'diese Power',
     titel:'Warum Laura Sarah den Vertrieb in ihrem Unternehmen anvertraut',
     wistia:'791eoio3ib',bild:W+'db9a21553e0ac536e15901f5b2458dab7a1f0dd7'+Q,dauer:'1:26'}
  ];
})();

window.zeigeKundinnen=function(el){
  if(!el)return;
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var K=window.KUNDINNEN||[];
  el.innerHTML=K.map(function(k,i){
    var z=esc(k.zitat); if(k.hl)z=z.replace(esc(k.hl),'<mark>'+esc(k.hl)+'</mark>');
    var img=k.bild?'<img src="'+esc(k.bild)+'" alt="'+esc(k.name)+' im Video" width="1000" height="1000" loading="lazy" onerror="this.remove()">':'';
    var hatVideo=!!(k.wistia||k.video);
    var play=hatVideo?'<button type="button" class="play" data-k="'+i+'" aria-label="Video von '+esc(k.name)+' abspielen"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"></path></svg></button>':'';
    var dauer=k.dauer?'<span class="dur">'+esc(k.dauer)+'</span>':'';
    return '<div class="res"><div class="res-img">'+img+dauer+'<div class="res-q">„'+z+'“</div>'+play+'</div><div class="res-b"><span class="tag">'+esc(k.tag)+'</span><div class="res-t">'+esc(k.titel)+'</div><div class="res-r">'+esc(k.name)+' · '+esc(k.rolle)+'</div></div></div>';
  }).join('');
  el.addEventListener('click',function(e){
    var b=e.target.closest('.play'); if(!b)return; var k=K[+b.getAttribute('data-k')];
    var src=k.wistia?'https://fast.wistia.net/embed/iframe/'+k.wistia+'?autoPlay=true&videoFoam=false&fitStrategy=cover&playerColor=E1C075&settingsControl=false&playbackRateControl=false':k.video;
    var box=b.parentNode;
    var f=document.createElement('iframe');f.src=src;f.title='Erfahrung von '+k.name;f.allow='autoplay; fullscreen';f.allowFullscreen=true;
    f.className='res-video';
    box.classList.add('spielt'); box.appendChild(f);
  });
};
