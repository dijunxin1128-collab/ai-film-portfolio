(() => {
  "use strict";
  const config = window.PORTFOLIO;
  if (!config) return;
  const { profile, ui, projects } = config;
  const escape = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const icon = (name) => {
    const paths = {
      arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
      external: '<path d="M7 17 17 7M7 7h10v10"/>',
      down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
      copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
      film: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7 5v14M17 5v14M3 10h4m-4 4h4m10-4h4m-4 4h4"/>',
      up: '<path d="M12 20V4m-6 6 6-6 6 6"/>'
    };
    return `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
  };
  const validUrl = (value, external = false) => {
    if (!value || typeof value !== "string") return "";
    if (/^https:\/\//i.test(value)) return value;
    if (external || /^(?:[a-z][a-z\d+.-]*:|\/|\\)/i.test(value)) return "";
    return value;
  };
  const externalLink = (project, className = "text-link") => {
    const url = validUrl(project.externalUrl, true);
    return url ? `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(project.title + '：' + ui.externalLinkLabel + '（新标签页）')}">${escape(ui.externalLinkLabel)}${icon("external")}</a>` : "";
  };
  const projectActions = (project) => {
    const link = externalLink(project, "button button-outline");
    return link ? `<div class="project-actions">${link}</div>` : "";
  };
  const tags = (items) => items?.length ? `<ul class="tags">${items.map((tag) => `<li>${escape(tag)}</li>`).join("")}</ul>` : "";
  const mediaFrame = (project, compact = false) => {
    const available = project.hasLocalVideo && Boolean(validUrl(project.videoPath));
    const poster = project.hasPoster ? validUrl(project.posterPath) : "";
    const ratio = /^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(project.aspectRatio) ? project.aspectRatio : "16 / 9";
    return `<div class="media-block${compact ? " media-block-compact" : ""}">
      <div class="media-frame" data-media="${escape(project.id)}" data-state="${available ? "ready" : "missing"}" style="--media-ratio:${escape(ratio)}">
        <video id="video-${escape(project.id)}" controls controlsList="nodownload" playsinline preload="none" ${poster ? `poster="${escape(poster)}"` : ""} aria-label="${escape(project.title + ' · ' + ui.play)}" ${available ? `data-src="${escape(validUrl(project.videoPath))}"` : "hidden"}>${escape(ui.videoFallback)}</video>
        <div class="media-placeholder" ${available ? "hidden" : ""}>
          ${poster ? `<img class="placeholder-poster" src="${escape(poster)}" alt="${escape(project.title + '封面')}" loading="lazy">` : ""}
          <div class="placeholder-content">
            <span class="placeholder-icon">${icon("film")}</span>
            <span class="placeholder-title">${escape(project.publishedTitle || project.title)}</span>
            ${project.subtitle ? `<span class="placeholder-subtitle">${escape(project.subtitle)}</span>` : ""}
            <p class="placeholder-status">${escape(ui.localPending)}</p>
            <p class="placeholder-hint">${escape(project.externalUrl ? ui.remoteHint : ui.noRemoteHint)}</p>
            <div class="placeholder-actions" hidden><button class="button button-outline retry-video" type="button" hidden>${escape(ui.retry)}</button></div>
          </div>
        </div>
      </div>
      <div class="media-caption"><span>${escape(project.specifications || project.subtitle || project.category)}</span><span class="media-state">${available ? `<span class="status-dot"></span>${escape(ui.inlineVideo)}` : escape(ui.videoUnavailable)}</span></div>
    </div>`;
  };
  const projectSection = (project) => `<section class="project-section page-width" id="${escape(project.id)}" aria-labelledby="heading-${escape(project.id)}">
    <div class="section-heading"><div><p class="section-kicker">${escape(project.category)}</p><h2 id="heading-${escape(project.id)}">${escape(project.title)}</h2></div>${tags(project.tags)}</div>
    <div class="project-layout">
      ${mediaFrame(project)}
      <div class="project-details">
        ${project.publishedTitle ? `<div class="published-work"><span class="detail-label">${escape(ui.publishedTitle)}</span><h3>${escape(project.publishedTitle)}</h3><p>${escape(project.subtitle)}</p></div>` : ""}
        <p class="project-description">${escape(project.description)}</p>
        <div class="responsibilities"><h3 class="detail-label">${escape(ui.responsibility)}</h3><p>${escape(project.responsibilities)}</p></div>
        ${project.tools ? `<div class="tools"><h3 class="detail-label">${escape(ui.tools)}</h3><p>${escape(project.tools.join(" / "))}</p></div>` : ""}
        ${project.awards ? `<div class="awards"><h3 class="detail-label">${escape(ui.awards)}</h3><ul>${project.awards.map((item) => `<li><strong>${escape(item.award)}</strong><span>${escape(item.competition)}</span></li>`).join("")}</ul></div>` : ""}
        ${projectActions(project)}
      </div>
    </div>
  </section>`;
  const collectionSection = (project) => `<section class="project-section media-section page-width" id="${escape(project.id)}" aria-labelledby="heading-media">
    <div class="section-heading"><div><p class="section-kicker">${escape(ui.mediaLabel)}</p><h2 id="heading-media">${escape(ui.mediaTitle)}</h2></div><p class="section-description">${escape(ui.mediaSubtitle)}</p></div>
    <div class="media-grid">${project.items.map((item) => `<article class="media-card" aria-labelledby="heading-${escape(item.id)}">${mediaFrame(item, true)}<div class="card-copy"><h3 id="heading-${escape(item.id)}">${escape(item.title)}</h3><p>${escape(item.description)}</p>${projectActions(item)}</div></article>`).join("")}</div>
  </section>`;
  document.title = ui.pageTitle;
  document.querySelector('meta[name="description"]').content = ui.pageDescription;
  document.querySelector("#app").innerHTML = `
    <a class="skip-link" href="#sea-survival">${escape(ui.skip)}</a>
    <header class="site-header"><div class="header-inner page-width">
      <a class="brand" href="#home"><span class="brand-mark" aria-hidden="true">${icon("film")}</span><span><strong>${escape(profile.name)}</strong><span class="brand-caption">${escape(ui.brandCaption)}</span></span></a>
      <button class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="${escape(ui.menu)}"><span></span><span></span></button>
      <nav id="main-nav" class="main-nav" aria-label="${escape(ui.navLabel)}">${config.navigation.map((item, index) => `<a href="#${escape(item.id)}"${index === 0 ? ' aria-current="location"' : ""}>${escape(item.label)}</a>`).join("")}</nav>
    </div></header>
    <main>
      <section id="home" class="hero page-width" aria-labelledby="hero-name">
        <div class="hero-main"><p class="hero-kicker"><span></span>${escape(ui.portfolioLabel)}</p><h1 id="hero-name">${escape(profile.name)}</h1><p class="hero-role">${escape(profile.role)}</p><p class="hero-directions">${escape(profile.directions)}</p><p class="hero-introduction">${escape(profile.shortIntroduction)}</p><div class="hero-actions"><a class="button button-primary" href="#sea-survival">${escape(ui.browse)}${icon("down")}</a></div></div>
        <aside class="work-index" aria-label="${escape(ui.indexTitle)}"><p class="index-label">${escape(ui.indexTitle)}</p>${projects.map((project) => `<a href="#${escape(project.id)}"><span><small>${escape(project.categoryShort)}</small><strong>${escape(project.indexTitle)}</strong></span>${icon("external")}</a>`).join("")}</aside>
        <div class="about-row"><div class="about-caption">${escape(ui.about)}</div><div class="about-content"><details><summary><span>${escape(ui.showAbout)}</span>${icon("down")}</summary><p>${escape(profile.introduction)}</p></details>${tags(profile.skills)}</div></div>
      </section>
      ${projects.map((project) => project.type === "collection" ? collectionSection(project) : projectSection(project)).join("")}
      <section id="contact" class="contact-section" aria-labelledby="contact-heading"><div class="contact-inner page-width"><div><p class="section-kicker">${escape(ui.contactLabel)}</p><h2 id="contact-heading">${escape(ui.contactTitle)}</h2><p class="contact-intro">${escape(ui.contactIntro)}</p><a class="email-address" href="mailto:${escape(profile.email)}">${escape(profile.email)}${icon("external")}</a><div class="contact-actions"><a class="button button-primary" href="mailto:${escape(profile.email)}">${icon("mail")}${escape(ui.emailAction)}</a><button class="button button-outline copy-email" type="button">${icon("copy")}<span>${escape(ui.copyEmail)}</span></button></div><p class="copy-status" role="status" aria-live="polite"></p></div><div class="contact-signature"><span class="contact-name">${escape(profile.name)}</span><p>${escape(profile.role)}</p></div></div></section>
    </main>
    <footer class="site-footer page-width"><p>${escape(ui.footer)}</p><a href="#home">${escape(ui.backTop)}${icon("up")}</a></footer>`;

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", ui.menu);
    nav.classList.remove("is-open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? ui.menuClose : ui.menu);
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    closeMenu();
    if (!link.getAttribute("href").startsWith("#")) return;
    const section = document.querySelector(link.getAttribute("href"));
    if (section) { section.tabIndex = -1; section.focus({ preventScroll: true }); }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); }
  });
  document.addEventListener("click", (event) => { if (!event.target.closest(".site-header")) closeMenu(); });
  window.matchMedia("(min-width: 801px)").addEventListener?.("change", closeMenu);
  const about = document.querySelector("details");
  about.addEventListener("toggle", () => { about.querySelector("summary span").textContent = about.open ? ui.hideAbout : ui.showAbout; });

  // 统一隐藏原生下载入口；也覆盖后续通过 DOM 动态新增的播放器。
  const hideVideoDownload = (root) => {
    if (!(root instanceof Element)) return;
    if (root.matches("video")) root.setAttribute("controlsList", "nodownload");
    root.querySelectorAll("video").forEach((video) => video.setAttribute("controlsList", "nodownload"));
  };
  hideVideoDownload(document.documentElement);
  new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach(hideVideoDownload));
  }).observe(document.documentElement, { childList: true, subtree: true });

  const videos = [...document.querySelectorAll("video")];
  const items = projects.flatMap((project) => project.items || [project]);
  const attachSource = (video) => {
    if (video.dataset.src && !video.getAttribute("src")) {
      video.preload = "metadata";
      video.src = video.dataset.src;
      video.load();
    }
  };
  const mediaObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { attachSource(entry.target); mediaObserver.unobserve(entry.target); } });
  }, { rootMargin: "160px" }) : null;
  videos.forEach((video) => {
    const frame = video.closest(".media-frame");
    const project = items.find((item) => item.id === frame.dataset.media);
    video.addEventListener("play", () => videos.forEach((other) => { if (other !== video) other.pause(); }));
    video.addEventListener("loadedmetadata", () => {
      if (video.videoWidth && video.videoHeight) frame.style.setProperty("--media-ratio", `${video.videoWidth} / ${video.videoHeight}`);
    });
    video.addEventListener("error", () => {
      if (!video.getAttribute("src")) return;
      frame.dataset.state = "error";
      video.hidden = true;
      frame.querySelector(".media-placeholder").hidden = false;
      frame.querySelector(".placeholder-status").textContent = ui.playbackError;
      frame.querySelector(".placeholder-hint").textContent = project.externalUrl ? ui.playbackErrorHint : ui.playbackErrorNoRemote;
      frame.querySelector(".placeholder-actions").hidden = false;
      frame.querySelector(".retry-video").hidden = false;
      frame.parentElement.querySelector(".media-state").textContent = ui.playbackError;
    });
    frame.querySelector(".retry-video").addEventListener("click", () => {
      frame.dataset.state = "ready";
      frame.querySelector(".media-placeholder").hidden = true;
      video.hidden = false;
      frame.parentElement.querySelector(".media-state").textContent = ui.inlineVideo;
      video.load();
      video.play().catch(() => { /* 原生控件仍可继续播放，网络/解码错误由 error 事件处理。 */ });
    });
    if (video.dataset.src) { if (mediaObserver) mediaObserver.observe(video); else attachSource(video); }
  });
  document.querySelectorAll(".placeholder-poster").forEach((image) => image.addEventListener("error", () => { image.hidden = true; }));

  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
      const active = config.navigation.find((item) => visible.get(item.id));
      if (!active) return;
      nav.querySelectorAll("a").forEach((link) => {
        if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-15% 0px -45% 0px", threshold: 0 });
    document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));
  }
  document.querySelector(".copy-email").addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try { await navigator.clipboard.writeText(profile.email); status.textContent = ui.copied; }
    catch { status.textContent = ui.copyError; }
  });

})();
