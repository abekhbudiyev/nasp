/* Local presentation layer. Original source data and actions remain intact. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let tourIndex = -1, tourTimer = null, flowTimer = null, flowStep = -1, flowRunning = false;
  let scenario = 'success';
  const flowNames = ['Масъул идора', 'Интеграция', 'Ягона ҳисоб', 'Тўлов / хизмат', 'Фуқаро кабинети'];
  const flowDetails = ['Чора ва олувчи бўйича хабар тайёрланди', 'Чора коди ва хабар формати текширилди', 'Шахс, давр ва такрорий хабар текширилди', 'Ижро натижаси қайд этилди', 'Фуқаро ва оила тарихида акс этди'];
  const tour = [
    ['reestr','ig','01 · Ягона реестр','37 идора, барча чоралар, 3 тур ва 6 йўналиш. Белгиларни босиб кесимларни очинг.'],
    ['reestr','det','02 · Ҳар бир чоранинг карточкаси','Рўйхат, қидирув, идора, тоифа ва ҳуқуқий асос. Қаторни босиб батафсил кўринг.'],
    ['dash','ig','03 · Кўрсатилган кўмак','Йил, чорак, ой, идора ва ҳудудни танланг. Барча рақамлар қайта ҳисобланади.'],
    ['reg','det','04 · Ҳудуддан туманга','Ҳудудларни солиштириш ва туманлар кесимига ўтиш.'],
    ['pass','ig','05 · Бир оила — ягона тарих','Оила аъзоси ва чорани босинг. Ойлик тўлов ва идорагача очилади.'],
    ['ctrl','det','06 · Назорат ва огоҳлантириш','Олти турдаги сигнал, ҳолат карточкаси ва ойлар бўйича далиллар.'],
    ['flow','ig','07 · Тизим қандай ишлайди','Муваффақиятли, такрорий ва хато хабарларни жонли синовдан ўтказинг.'],
    ['chome','ig','08 · Фуқаро кабинети','Тўловлар, оила, ҳуқуқлар, хизматлар ва ариза бериш.']
  ];
  const bar = document.createElement('div'); bar.id='presentation-tools';
  document.body.prepend(bar);
  new ResizeObserver(() => document.documentElement.style.setProperty('--toolbar-height', bar.offsetHeight+'px')).observe(bar);
  const baseRender=render;
  function toolbar() {
    bar.innerHTML=`<div class="pt-brand"><i></i><b>ЯГОНА ИЖТИМОИЙ ПЛАТФОРМА</b><span>Интерактив намойиш</span></div><div class="pt-actions"><div class="pt-roles" aria-label="Намойиш роли">${Object.entries(ROLES).map(([k,r])=>`<button data-p="role" data-v="${k}" aria-pressed="${S.role===k}">${r.n}</button>`).join('')}</div><button data-p="flow" class="pt-flow">▷ Жараённи кўриш</button><button data-p="tour" class="pt-primary">${tourTimer?'Ⅱ Тўхтатиш':'▶ Тақдимотни бошлаш'}</button></div>${tourIndex>=0?`<div class="pt-story"><button data-p="prev" aria-label="Олдинги босқич" ${tourIndex===0?'disabled':''}>←</button><div><b>${tour[tourIndex][2]}</b><span>${tour[tourIndex][3]}</span></div><button data-p="next" aria-label="Кейинги босқич" ${tourIndex===tour.length-1?'disabled':''}>→</button><button data-p="end" aria-label="Тақдимотни ёпиш">×</button><div class="pt-progress" style="width:${(tourIndex+1)/tour.length*100}%"></div></div>`:''}`;
  }
  function animate() {
    if(reduced.matches)return;
    document.querySelectorAll('.ig-card,.ig-hero,.panel,.kpi,.sv,.sigc').forEach((el,i)=>el.animate([{opacity:.25,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,delay:Math.min(i*55,350),fill:'backwards',easing:'cubic-bezier(.2,.8,.2,1)'}));
    document.querySelectorAll('.mcols button>i,.pod-b').forEach((el,i)=>el.animate([{transform:'scaleY(.02)'},{transform:'scaleY(1)'}],{duration:950,delay:i*45,easing:'ease-out'}));
    document.querySelectorAll('.waffle i,.ct-d i').forEach((el,i)=>el.animate([{opacity:0,transform:'scale(.1)'},{opacity:1,transform:'scale(1)'}],{duration:500,delay:Math.min(i*12,1000),fill:'backwards'}));
    document.querySelectorAll('.ig-big,.bub-c b,.fld2 b,.sigc>b').forEach(el=>{
      const node=[...el.childNodes].find(n=>n.nodeType===3&&/^\s*\d[\d\s\u00a0\u202f]*(?:[,.]\d+)?\s*$/.test(n.textContent));
      if(!node)return;const original=node.textContent,clean=original.replace(/[\s\u00a0\u202f]/g,'').replace(',','.');const target=Number(clean);if(!Number.isFinite(target))return;
      const decimals=clean.includes('.')?clean.split('.')[1].length:0;const start=performance.now();
      function tick(now){if(!node.isConnected)return;const p=Math.min((now-start)/1100,1);node.textContent=p===1?original:new Intl.NumberFormat('ru-RU',{maximumFractionDigits:decimals,minimumFractionDigits:decimals}).format(target*(1-Math.pow(1-p,3)))+' ';if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);
    });
  }
  render=function(keepFocus){baseRender(keepFocus);toolbar();if(!keepFocus)animate()};
  function stopTour(){clearInterval(tourTimer);tourTimer=null;toolbar()}
  function showTour(index){
    tourIndex=Math.max(0,Math.min(index,tour.length-1));const [page,mode]=tour[tourIndex];
    document.getElementById('login').hidden=true;document.querySelector('.app').removeAttribute('aria-hidden');
    applyRole(page==='chome'?'cit':'boss');S.mode=mode;S.o=S.r=S.t=S.d=S.c='';S.months=ALL();S.y=2025;S.rf={t:null,f:null,c:null,o:null};go(page);
    if(tourIndex===tour.length-1)stopTour();
  }
  function haltFlow(){clearInterval(flowTimer);flowTimer=null;flowRunning=false}
  function flowHTML(){
    const blocked=scenario!=='success'&&flowStep>=2;const complete=flowStep===4&&!blocked;
    return `<div class="flow-demo"><div class="fd-heading"><div><p>ИДОРАДАН ФУҚАРОГАЧА</p><h1>Бир хабарнинг тизимдаги йўли</h1><span>Намойиш синови · ҳақиқий тўлов ёки тайинлаш амалга оширилмайди</span></div><span class="fd-badge ${blocked?'fd-red':complete?'fd-green':''}">${blocked?'Текширувда тўхтатилди':complete?'Муваффақиятли якунланди':flowRunning?'Хабар қайта ишланмоқда':'Синовга тайёр'}</span></div>
    <div class="fd-scenarios">${[['success','✓ Тўғри хабар','Барча текширувлардан ўтади'],['duplicate','⚠ Такрорий хабар','Қайта ҳисобга олинмайди'],['invalid','! Чора коди йўқ','Тузатиш учун қайтарилади']].map(([k,n,d])=>`<button data-p="scenario" data-v="${k}" class="${scenario===k?'selected':''}"><b>${n}</b><span>${d}</span></button>`).join('')}</div>
    <div class="fd-controls"><button class="btn pri" data-p="run">${flowRunning?'Ⅱ Пауза':flowStep>=4||blocked?'↻ Қайта кўрсатиш':'▶ Жараённи бошлаш'}</button><button class="btn" data-p="step">Бир қадам →</button><button class="btn" data-p="reset">Тозалаш</button></div>
    <div class="fd-pipeline">${flowNames.map((n,i)=>`<div class="fd-node ${i<flowStep||complete?'done':''} ${i===flowStep&&!complete?(blocked?'blocked':'active'):''}"><div class="fd-orb">${i<flowStep||complete?'✓':i===flowStep&&blocked?'!':i+1}</div><b>${n}</b><span>${i<=flowStep?i===2&&blocked?(scenario==='duplicate'?'Аввалги хабар топилди':'Мажбурий майдон тўлдирилмаган'):flowDetails[i]:'Хабар кутилмоқда'}</span>${i<4?'<div class="fd-link"><i></i></div>':''}</div>`).join('')}</div>
    <div class="fd-results"><div><span>Кирувчи хабар</span><b>${flowStep>=0?1:0}</b></div><div class="fd-green"><span>Янги ҳисоб ёзуви</span><b>${flowStep>=2&&!blocked?1:0}</b></div><div class="${blocked?'fd-red':''}"><span>${scenario==='duplicate'?'Такрорий хабар':'Тузатиш талаб этилади'}</span><b>${blocked?1:0}</b></div><div class="fd-green"><span>Кабинетда акс этди</span><b>${complete?1:0}</b></div></div>
    <section class="fd-log"><h2>Хабарни қайта ишлаш журнали</h2>${flowStep<0?'<p>Сценарийни танланг ва жараённи бошланг.</p>':flowNames.slice(0,flowStep+1).map((n,i)=>`<div><span class="${i===2&&blocked?'fd-red':'fd-green'}">${i===2&&blocked?'!':'✓'}</span><code>DEMO-001 · 0${i+1}</code><b>${n}</b><span>${i===2&&blocked?(scenario==='duplicate'?'Янги ёзув яратилмади. Аввалги натижа сақланди.':'Хабар рад этилди. Идорага тузатиш талаби қайтарилди.'):flowDetails[i]}</span></div>`).join('')}</section>${complete?'<button class="btn pri" data-a="go" data-v="pass">Фуқаро паспорти кўринишини очиш →</button>':''}</div>`;
  }
  PAGES.flow=flowHTML;FILTERS.flow='';
  function step(){if(flowStep>=4||(scenario!=='success'&&flowStep>=2)){haltFlow();return}flowStep++;if(flowStep===4||(scenario!=='success'&&flowStep===2))haltFlow();render()}
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-p]');if(!el||el.disabled)return;const v=el.dataset.v;
    switch(el.dataset.p){
      case 'role':stopTour();tourIndex=-1;document.getElementById('login').hidden=true;document.querySelector('.app').removeAttribute('aria-hidden');applyRole(v);break;
      case 'flow':stopTour();if(S.role==='cit')applyRole('boss');go('flow');break;
      case 'tour':if(tourTimer){stopTour();break}showTour(tourIndex<0||tourIndex===tour.length-1?0:tourIndex);tourTimer=setInterval(()=>showTour(tourIndex+1),14000);toolbar();break;
      case 'next':stopTour();showTour(tourIndex+1);break;
      case 'prev':stopTour();showTour(tourIndex-1);break;
      case 'end':stopTour();tourIndex=-1;toolbar();break;
      case 'scenario':haltFlow();scenario=v;flowStep=-1;render();break;
      case 'run':if(flowRunning){haltFlow();render();break}if(flowStep>=4||(scenario!=='success'&&flowStep>=2))flowStep=-1;flowRunning=true;step();if(flowRunning)flowTimer=setInterval(step,1500);break;
      case 'step':haltFlow();step();break;
      case 'reset':haltFlow();flowStep=-1;render();break;
    }
  });
  // Pause automatic touring on deliberate exploration so it never takes the screen away.
  document.addEventListener('pointerdown',e=>{if(tourTimer&&!e.target.closest('#presentation-tools'))stopTour()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopTour();haltFlow()}});
  const oldGo=go;go=function(p){if(p!=='flow')haltFlow();oldGo(p)};ACT.go=v=>go(v);
  // The source's monitoring map had no action. Show the region's evidence locally.
  ACT.noop=v=>{
    if(S.page!=='ctrl')return;
    const sig=SIGS.find(x=>x.k===(S.sig||'dup'));const data=MON[sig.k];const index=RMAP.indexOf(+v);const region=data.reg[index];
    if(!region)return;
    const items=data.smp.filter(x=>RMAP[x.ri]===+v);
    S.drawer=null;render();
    document.getElementById('drawer').innerHTML=`<div class="scrim" data-a="close"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Ҳудуд назорати"><button class="xbtn" data-a="close" aria-label="Ёпиш">×</button><h2>${esc(DATA.regions[+v])}</h2><p>${esc(sig.n)}</p><div class="dk"><div><span>Ҳолатлар</span><b>${cnt(region[0])}</b></div><div><span>Сумма</span><b>${bn(region[1])}</b></div></div><h3>Манбадаги намунавий ҳолатлар</h3>${items.length?items.map(x=>`<button class="btn" style="display:block;margin:10px 0" ${sig.k==='payee'?'disabled':`data-a="case" data-v="${x.id}"`}>Ҳолат #${x.id} →</button>`).join(''):'<p>Бу ҳудуднинг алоҳида ҳолатлари намуна рўйхатида берилмаган. Юқорида ҳудуднинг жами кўрсаткичи.</p>'}</aside>`;
    S.drawer='region-local';
  };
  document.getElementById('login').hidden=true;document.querySelector('.app').removeAttribute('aria-hidden');
  applyRole('boss');
  const initialPage=document.documentElement.dataset.initialPage;
  if(initialPage&&initialPage!=='reestr')go(initialPage);
})();
