/* Vendera Video-Player
   Markup: <div class="vp" data-vp data-src-720="…mp4" data-src-1080="…mp4" data-poster="…jpg" data-label="Video ansehen · 1:42" data-name="einladung"></div>
   Lädt das Video erst beim Klick. Meldet Ereignisse an window.vpEvent(name), falls vorhanden. */
(function(){
  var I={
    play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.4-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    pause:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    on:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    off:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor"/><path d="m16 9 6 6M22 9l-6 6"/></svg>',
    fs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };
  function fmt(s){s=Math.max(0,Math.floor(s||0));var m=Math.floor(s/60),r=s%60;return m+':'+(r<10?'0':'')+r;}
  function ev(name){try{if(window.vpEvent)window.vpEvent(name);}catch(e){}}

  function init(el){
    if(el.__vp)return; el.__vp=1;
    var name=el.getAttribute('data-name')||'video';
    var poster=el.getAttribute('data-poster');
    var label=el.getAttribute('data-label')||'Video ansehen';
    el.innerHTML=
      (poster?'<img class="vp-poster" alt="" src="'+poster+'" decoding="async">':'')+
      '<video playsinline preload="none" disablepictureinpicture controlslist="nodownload noplaybackrate"'+(poster?' poster="'+poster+'"':'')+'></video>'+
      '<div class="vp-tap" aria-hidden="true"></div>'+
      '<button type="button" class="vp-start" aria-label="'+label+'"><span class="vp-disc">'+I.play.replace('<svg','<svg width="30" height="30"')+'</span><span class="vp-lbl">'+label+'</span></button>'+
      '<div class="vp-ui">'+
        '<button type="button" class="vp-toggle" aria-label="Abspielen oder pausieren"><span class="vp-ico-play">'+I.play+'</span><span class="vp-ico-pause">'+I.pause+'</span></button>'+
        '<span class="vp-tc"><span class="vp-cur">0:00</span><span class="vp-dur"></span></span>'+
        '<div class="vp-bar" role="slider" tabindex="0" aria-label="Position im Video" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="vp-fill"></span><span class="vp-knob"></span></div>'+
        '<button type="button" class="vp-mute" aria-label="Ton an oder aus"><span class="vp-ico-on">'+I.on+'</span><span class="vp-ico-off">'+I.off+'</span></button>'+
        '<button type="button" class="vp-fs" aria-label="Vollbild">'+I.fs+'</button>'+
      '</div>';
    var v=el.querySelector('video'), q=function(s){return el.querySelector(s);};
    var cur=q('.vp-cur'), dur=q('.vp-dur'), bar=q('.vp-bar'), fill=q('.vp-fill'), knob=q('.vp-knob');
    var loaded=false, marks={25:0,50:0,75:0,95:0}, idleT;

    function src(){
      var hi=el.getAttribute('data-src-1080'), lo=el.getAttribute('data-src-720')||hi;
      var big=(window.innerWidth*(window.devicePixelRatio||1))>1100 && !(navigator.connection&&navigator.connection.saveData);
      return big&&hi?hi:lo;
    }
    function start(){
      if(!loaded){v.src=src();loaded=true;ev(name+'_play');}
      el.classList.add('vp--started');
      var p=v.play(); if(p&&p.catch)p.catch(function(){});
    }
    function toggle(){if(!loaded||v.paused)start();else v.pause();}
    function wake(){el.classList.remove('vp--idle');clearTimeout(idleT);idleT=setTimeout(function(){el.classList.add('vp--idle');},2200);}

    q('.vp-start').addEventListener('click',start);
    q('.vp-tap').addEventListener('click',function(){if(el.classList.contains('vp--started'))toggle();});
    q('.vp-toggle').addEventListener('click',toggle);
    q('.vp-mute').addEventListener('click',function(){v.muted=!v.muted;el.classList.toggle('vp--muted',v.muted);});
    q('.vp-fs').addEventListener('click',function(){
      var t=el; if(t.requestFullscreen)t.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();else if(t.webkitRequestFullscreen)t.webkitRequestFullscreen();
    });
    el.addEventListener('mousemove',wake); el.addEventListener('touchstart',wake,{passive:true});

    v.addEventListener('play',function(){el.classList.add('vp--playing');wake();});
    v.addEventListener('pause',function(){el.classList.remove('vp--playing','vp--idle');});
    v.addEventListener('ended',function(){el.classList.remove('vp--playing','vp--idle');ev(name+'_ende');});
    v.addEventListener('loadedmetadata',function(){dur.textContent=' / '+fmt(v.duration);});
    v.addEventListener('timeupdate',function(){
      var p=v.duration?v.currentTime/v.duration*100:0;
      fill.style.width=p+'%'; knob.style.left=p+'%'; cur.textContent=fmt(v.currentTime); bar.setAttribute('aria-valuenow',Math.round(p));
      for(var k in marks){if(!marks[k]&&p>=+k){marks[k]=1;ev(name+'_'+k);}}
    });

    function seek(x){var r=bar.getBoundingClientRect();var f=Math.min(1,Math.max(0,(x-r.left)/r.width));if(v.duration)v.currentTime=f*v.duration;}
    var drag=false;
    bar.addEventListener('pointerdown',function(e){drag=true;bar.setPointerCapture(e.pointerId);seek(e.clientX);});
    bar.addEventListener('pointermove',function(e){if(drag)seek(e.clientX);});
    bar.addEventListener('pointerup',function(){drag=false;});
    bar.addEventListener('keydown',function(e){if(!v.duration)return;if(e.key==='ArrowRight')v.currentTime=Math.min(v.duration,v.currentTime+5);if(e.key==='ArrowLeft')v.currentTime=Math.max(0,v.currentTime-5);});
  }
  function all(){Array.prototype.forEach.call(document.querySelectorAll('[data-vp]'),init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',all);else all();
  window.vpInit=all;
})();
