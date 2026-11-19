(() => {
  'use strict';
  const config = window.PORTFOLIO;
  if (!config) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const works = config.projects.filter(item => item.type !== 'collection');
  const episodes = config.projects.find(item => item.id === 'media').items;
  let selectedEpisode = 0;
  let modalReturnFocus = null;
  const external = (item, className='mini-link') => item.externalUrl ? `<a class="${className}" href="${esc(item.externalUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.title)}：前往原发布链接（新标签页）">${esc(config.ui.externalLinkLabel)}</a>` : '';
  const video = (item, className='') => item.hasLocalVideo && item.videoPath ? `<video class="${className}" controls controlsList="nodownload" playsinline preload="metadata" ${item.hasPoster && item.posterPath ? `poster="${esc(item.posterPath)}"` : ''} src="${esc(item.videoPath)}" aria-label="${esc(item.title)}视频">您的浏览器不支持视频播放。</video>` : '';
  const visual = (item, type='work') => {
    const hasPoster = item.hasPoster && item.posterPath;
    const label = hasPoster ? `<img src="${esc(item.posterPath)}" alt="${esc(item.title)}封面" loading="lazy">` : `<div class="empty-visual"><span>影像素材待接入</span></div>`;
    const canPlay = item.hasLocalVideo && item.videoPath;
    return `<div class="${type === 'software' ? 'software-visual' : 'work-visual'}">${label}<span class="overlay-label">${type === 'software' ? 'CREATIVE SOFTWARE' : 'LIVE ACTION'} / ${esc(item.number)}</span>${canPlay ? `<button type="button" class="hover-play" data-open="${esc(item.id)}" aria-label="查看${esc(item.title)}视频">▶</button>` : `<button type="button" class="visual-detail" data-open="${esc(item.id)}">查看项目详情 ↗</button>`}</div>`;
  };
  const card = (item, kind) => `<article class="work-card ${kind === 'software' ? 'software-card' : ''} reveal">
    ${visual(item,kind)}
    <div class="card-meta"><span>${esc(item.note)}</span><span>${kind === 'software' ? 'SOFTWARE' : 'FILM'} / ${esc(item.number)}</span></div>
    <h3 class="card-title">${esc(item.title)}</h3>
    <p class="card-desc">${esc(item.subtitle)}。${esc(item.summary || item.description)}</p>
    ${item.tools?.length ? `<div class="card-tools">${item.tools.map(tool => `<span>${esc(tool)}</span>`).join('')}</div>` : ''}
    <div class="card-bottom"><span class="role">${kind === 'software' ? 'PRODUCT' : 'FILM'} / ${esc(item.number)}</span>${item.externalUrl ? external(item) : `<button type="button" class="mini-link" data-open="${esc(item.id)}">了解项目 →</button>`}</div>
  </article>`;
  const codeZero = works.find(item => item.id === 'code-zero');
  const textOnly = item => `<article class="work-card reveal text-only-work" aria-label="${esc(item.title)} · 文字项目介绍"><div class="text-only-upper">
    <span class="text-only-eyebrow">01 / LIVE ACTION · PROJECT RECORD</span>
    <h3>${esc(item.title)}</h3><p class="text-only-subtitle">${esc(item.subtitle)}</p>
    <dl class="text-only-fields"><div class="text-only-field"><dt>项目简介</dt><dd>待补充</dd></div><div class="text-only-field"><dt>个人职责</dt><dd>${esc(item.responsibilities)}</dd></div><div class="text-only-field"><dt>视频生成工具</dt><dd>${esc(item.tools.join(' · '))}</dd></div></dl>
    </div><button type="button" class="text-only-action" data-open="${esc(item.id)}">查看文字介绍 <span aria-hidden="true">→</span></button></article>`;
  $('#filmsGrid').innerHTML = [textOnly(codeZero),...works.filter(item => item.type === 'film' && !item.textOnly).map(item => card(item,'film'))].join('');
  $('#softwareGrid').innerHTML = works.filter(item => item.type === 'software').map(item => card(item,'software')).join('');

  const fox = works.find(item => item.type === 'animation');
  $('.fox-copy h2').textContent = fox.title;
  $('.fox-copy p').textContent = fox.description;
  $('.award').innerHTML = (fox.awards || []).map(item => `<span>✦ ${esc(item.competition)} · ${esc(item.award)}</span>`).join('');
  $('#foxMedia').innerHTML = video(fox,'fox-video');
  $('.fox-copy').insertAdjacentHTML('beforeend',external(fox));

  const stageMedia = $('#stageMedia');
  const stageArt = $('#stageArt');
  const stageCenter = stageMedia.querySelector('.stage-center');
  const setEpisode = (index, scroll=true) => {
    selectedEpisode = Math.max(0,Math.min(episodes.length-1,index));
    const item = episodes[selectedEpisode];
    stageMedia.querySelector('video')?.pause();
    stageMedia.querySelector('video')?.remove();
    const hasVideo = item.hasLocalVideo && item.videoPath;
    if (hasVideo) {
      stageMedia.insertAdjacentHTML('beforeend',video(item,'stage-video'));
      stageArt.hidden = true;
      stageCenter.hidden = true;
    } else {
      stageArt.hidden = false;
      stageCenter.hidden = false;
      $('#stageNum').textContent = item.number;
      $('#stageTitleArt').textContent = item.title;
    }
    $('#stageKicker').textContent = `EPISODE ${item.number} / 06`;
    $('#stageTitle').textContent = item.title;
    $('#stageDesc').textContent = item.description;
    $('#stageStatus').textContent = hasVideo ? '站内视频可播放' : '站内视频待接入';
    const link = $('#stageExternal');
    link.href = item.externalUrl;
    link.setAttribute('aria-label',`${item.title}：前往原发布链接（新标签页）`);
    $$('.ep-card').forEach((button,i) => {
      button.classList.toggle('selected',i===selectedEpisode);
      button.setAttribute('aria-pressed',String(i===selectedEpisode));
    });
    $('#episodePrev').disabled = selectedEpisode===0;
    $('#episodeNext').disabled = selectedEpisode===episodes.length-1;
    if(scroll) $(`.ep-card[data-episode="${selectedEpisode}"]`)?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});
  };
  $('#episodeScroll').innerHTML = episodes.map((item,index) => `<button class="ep-card" type="button" data-episode="${index}" aria-label="切换到第${Number(item.number)}期：${esc(item.title)}" aria-pressed="false"><div class="ep-thumb"><b>${esc(item.number)}</b></div><div class="ep-label"><span>EP. ${esc(item.number)}</span><span>${item.hasLocalVideo ? '站内可播放' : '视频待接入'}</span></div><div class="ep-title">${esc(item.title)}</div></button>`).join('');
  setEpisode(0,false);
  $$('.ep-card').forEach(button => button.addEventListener('click',() => setEpisode(Number(button.dataset.episode),false)));
  $('#episodePrev').addEventListener('click',() => setEpisode(selectedEpisode-1));
  $('#episodeNext').addEventListener('click',() => setEpisode(selectedEpisode+1));
  $('#scrollLeft').addEventListener('click',() => $('#episodeScroll').scrollBy({left:-460,behavior:'smooth'}));
  $('#scrollRight').addEventListener('click',() => $('#episodeScroll').scrollBy({left:460,behavior:'smooth'}));

  const modal = $('#modal');
  const modalStage = $('#modalStage');
  const openModal = (id, trigger) => {
    const item = works.find(project => project.id === id);
    if(!item) return;
    modalReturnFocus = trigger || document.activeElement;
    $('#modalKicker').textContent = item.type === 'film' ? 'LIVE ACTION / FILM PROJECT' : item.type === 'software' ? 'SOFTWARE / PRODUCT' : 'ORIGINAL ANIMATION';
    $('#modalTitle').textContent = item.title;
    $('#modalDesc').textContent = item.textOnly ? '中剧 · 第1集。项目简介待补充。' : `${item.subtitle}。${item.description}`;
    const facts = [];
    if(item.responsibilities) facts.push(`<div class="project-fact"><span>个人职责</span><p>${esc(item.responsibilities)}</p></div>`);
    if(item.tools?.length) facts.push(`<div class="project-fact"><span>${item.type === 'software' ? '开发工具' : '制作工具'}</span><p>${esc(item.tools.join(' · '))}</p></div>`);
    if(item.awards?.length) facts.push(`<div class="project-fact"><span>获奖信息</span><p>${item.awards.map(award => `${esc(award.competition)}：${esc(award.award)}`).join('<br>')}</p></div>`);
    if(item.externalUrl) facts.push(`<div class="project-fact"><span>公开发布链接</span><p>${external(item,'project-external')}</p></div>`);
    $('#modalExtra').innerHTML = facts.join('');
    $('#modalExtra').hidden = !facts.length;
    modalStage.classList.toggle('text-only-stage',Boolean(item.textOnly));
    if(item.textOnly) {
      modalStage.innerHTML = `<div class="text-only-detail"><span class="td-caption">01 / LIVE ACTION · PROJECT PROFILE</span><h3>${esc(item.title)}</h3><p class="td-type">${esc(item.subtitle)}</p><div class="td-fields"><section><h4>项目简介</h4><p>待补充</p></section><section><h4>个人职责</h4><p>${esc(item.responsibilities)}</p></section><section><h4>视频生成工具</h4><p>${esc(item.tools.join(' · '))}</p></section></div></div>`;
    } else if(item.hasLocalVideo && item.videoPath) {
      modalStage.innerHTML = video(item,'modal-video');
    } else {
      modalStage.innerHTML = `<div class="modal-empty"><span>${esc(item.title)}</span><p>站内视频待接入</p></div>`;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    $('#modalClose').focus();
  };
  const closeModal = () => {
    modalStage.querySelector('video')?.pause();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    modalStage.innerHTML = '';
    modalReturnFocus?.focus?.();
  };
  document.addEventListener('click',event => {
    const button = event.target.closest('[data-open]');
    if(button) openModal(button.dataset.open,button);
  });
  $('#modalClose').addEventListener('click',closeModal);
  modal.addEventListener('click',event => {if(event.target === modal) closeModal();});
  document.addEventListener('keydown',event => {if(event.key === 'Escape' && modal.classList.contains('open')) closeModal();});

  const menuButton = $('#mobileMenu');
  const mainNav = $('#mainNav');
  menuButton.addEventListener('click',() => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded',String(expanded));
    mainNav.classList.toggle('open',expanded);
  });
  $$('#mainNav a').forEach(link => link.addEventListener('click',() => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  }));
  $('#backTop').addEventListener('click',() => window.scrollTo({top:0,behavior:'smooth'}));
  $('#copyEmail').addEventListener('click',async() => {
    try {await navigator.clipboard.writeText(config.profile.email); $('#toast').textContent='邮箱已复制';}
    catch {$('#toast').textContent='请手动复制：'+config.profile.email;}
    $('#toast').classList.add('show');
    setTimeout(() => $('#toast').classList.remove('show'),2500);
  });
  window.addEventListener('scroll',() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#scrollMeter').style.width = (max ? Math.min(100,scrollY/max*100) : 0)+'%';
  },{passive:true});
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) {entry.target.classList.add('visible');reveal.unobserve(entry.target);}
  }),{rootMargin:'0px 0px 40px 0px',threshold:0.02});
  $$('.reveal').forEach(element => reveal.observe(element));
  // 所有当前及后续动态插入的 HTML5 播放器都隐藏原生下载入口。
  const hideDownloads = root => {
    if(!(root instanceof Element)) return;
    if(root.matches('video')) root.setAttribute('controlsList','nodownload');
    root.querySelectorAll('video').forEach(element => element.setAttribute('controlsList','nodownload'));
  };
  hideDownloads(document.documentElement);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(hideDownloads))).observe(document.documentElement,{childList:true,subtree:true});
})();
