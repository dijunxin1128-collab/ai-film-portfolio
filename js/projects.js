/*
 * 所有页面文案、视频、封面和链接的唯一配置入口。
 * 接入视频：复制到 videoPath 对应位置，再将 hasLocalVideo 改为 true。
 * 接入封面：复制到 posterPath 对应位置，再将 hasPoster 改为 true。
 * videoPath 也接受 HTTPS 直链（需服务器支持视频 MIME 和 Range）。
 * 不要将抖音/B站网页地址填入 videoPath；它们应保留在 externalUrl。
 */
window.PORTFOLIO = {
  profile: {
    name: "邸骏昕",
    role: "AIGC 视频生成师 / AI 影视制作",
    directions: "AI 影视创作 · 生成式视频工作流 · 创作软件研发",
    email: "2472386299@qq.com",
    introduction: "数字媒体艺术专业背景，具备 AI 影视制作、生成式视频工作流及软件研发的综合实践经验。曾独立创作 AI 动画短片《勇敢的狐狸小橙》，并参与海外动画、院线电影及衍生影视项目制作。熟悉角色资产构建、LoRA 模型训练、镜头预可视化、AI 视频生成与后期合成等完整制作流程，同时具备 AI 视频教学、自媒体内容制作及独立软件研发经验。",
    shortIntroduction: "从角色与场景资产构建，到镜头生成与后期合成；以完整的制作流程，连接影视创作与技术实践。",
    skills: ["角色资产构建", "LoRA 模型训练", "镜头预可视化", "AI 视频生成", "后期合成"]
  },
  resume: {
    path: "assets/documents/di-junxin-resume.pdf",
    available: true,
    downloadName: "邸骏昕_个人简历.pdf"
  },
  ui: {
    pageTitle: "邸骏昕 · AI 影视作品集",
    pageDescription: "邸骏昕个人影视作品集：AI 影视创作、生成式视频工作流与创作软件研发。",
    brandCaption: "个人影视作品集",
    portfolioLabel: "影像创作与技术实践",
    browse: "浏览作品",
    download: "下载简历",
    resumeUnavailable: "PDF 简历待补充",
    resumeChecking: "正在确认简历…",
    resumeNote: "正式 PDF 简历尚未提供，可通过邮箱联系。",
    about: "关于我",
    indexTitle: "作品目录",
    responsibility: "个人职责",
    tools: "开发工具",
    awards: "获奖信息",
    publishedTitle: "已发布作品",
    externalLinkLabel: "查看原发布作品",
    localPending: "站内视频待补充",
    remoteHint: "可前往原发布平台观看完整作品",
    noRemoteHint: "演示视频将在素材补充后开放播放",
    playbackError: "站内视频暂时无法播放",
    playbackErrorHint: "可重试播放，或前往原发布平台观看",
    playbackErrorNoRemote: "请重试播放；若仍失败，可通过邮箱联系",
    retry: "重试播放",
    play: "播放视频",
    videoFallback: "浏览器暂不支持此视频，请使用较新的浏览器。",
    inlineVideo: "站内播放",
    videoUnavailable: "视频待补充",
    mediaTitle: "自媒体与 AI 视频教学",
    mediaSubtitle: "分享制作方法，也记录创作过程。",
    mediaLabel: "工作流与教学",
    contactTitle: "期待下一次创作。",
    contactIntro: "关于影视制作、AI 创作与工作机会，欢迎通过邮箱联系。",
    contactLabel: "联系与简历",
    emailAction: "邮件联系",
    copyEmail: "复制邮箱",
    copied: "邮箱已复制",
    copyError: "请长按或选中上方邮箱复制",
    footer: "邸骏昕 · 个人影视作品集",
    backTop: "回到顶部",
    skip: "跳到作品内容",
    menu: "展开导航",
    menuClose: "收起导航",
    navLabel: "主导航",
    showAbout: "展开完整介绍",
    hideAbout: "收起完整介绍"
  },
  navigation: [
    { id: "home", label: "首页" },
    { id: "sea-survival", label: "影视作品" },
    { id: "cura", label: "Cura" },
    { id: "media", label: "自媒体" },
    { id: "little-orange-fox", label: "原创动画" },
    { id: "contact", label: "联系我" }
  ],
  projects: [
    {
      id: "sea-survival",
      title: "《海上求生》",
      indexTitle: "海上求生",
      category: "AI 真人电影风格影视作品",
      categoryShort: "AI 影视制作",
      publishedTitle: "《太平洋漂流记》",
      subtitle: "AI 灾难电影概念预告",
      description: "围绕飞机失事、三人海上求生及灾难场景展开影视视觉制作。涉及角色与场景资产构建、影视分镜、镜头生成及后期合成，重点处理角色跨镜头一致性、复杂镜头与画面连续性。",
      responsibilities: "前期视觉开发、角色及场景资产设计、影视分镜设计、AI 视频生成、复杂镜头制作与画面连续性控制。",
      tags: ["角色一致性", "复杂镜头", "画面连续性"],
      videoPath: "assets/videos/sea-survival.mp4",
      posterPath: "assets/posters/sea-survival.jpg",
      hasLocalVideo: true,
      hasPoster: true,
      aspectRatio: "1298 / 544",
      externalUrl: "https://v.douyin.com/UcCBg1EC5Ow/"
    },
    {
      id: "cura",
      title: "Cura",
      indexTitle: "Cura",
      category: "AI 影视创作辅助软件",
      categoryShort: "创作软件研发",
      subtitle: "从空白开始",
      description: "独立规划与研发的影视创作辅助平台，围绕可视化白板、项目管理、影视素材组织及 AI 创作辅助功能开展产品设计与开发。",
      responsibilities: "产品设计、需求分析、技术方案规划、功能开发、代码调试、测试验收及版本迭代。",
      tools: ["ChatGPT", "OpenAI Codex"],
      tags: ["可视化白板", "项目管理", "AI 创作辅助"],
      specifications: "35 秒演示",
      videoPath: "assets/videos/cura-demo.mp4",
      posterPath: "assets/posters/cura-demo.jpg",
      hasLocalVideo: true,
      hasPoster: true,
      aspectRatio: "16 / 9",
      externalUrl: ""
    },
    {
      id: "media",
      title: "自媒体与 AI 视频教学",
      indexTitle: "自媒体与 AI 视频教学",
      categoryShort: "工作流分享",
      type: "collection",
      items: [
        {
          id: "media-01",
          title: "AI 项目资产管理",
          description: "讲解 AI 影视制作中角色、场景、道具等视觉资产的组织与管理方法。",
          category: "资产管理",
          videoPath: "assets/videos/media-01.mp4",
          posterPath: "assets/posters/media-01.jpg",
          hasLocalVideo: true,
          hasPoster: false,
          aspectRatio: "1408 / 720",
          externalUrl: "https://v.douyin.com/FPAesJE8urQ/"
        },
        {
          id: "media-02",
          title: "AI 定制化资产生成",
          description: "通过 AI Agent 构建统一世界观下的角色、场景与道具资产。",
          category: "资产生成",
          videoPath: "assets/videos/media-02.mp4",
          posterPath: "assets/posters/media-02.jpg",
          hasLocalVideo: true,
          hasPoster: false,
          aspectRatio: "960 / 528",
          externalUrl: "https://v.douyin.com/EG09VYZa1yo/"
        },
        {
          id: "media-03",
          title: "从链接到成片",
          description: "展示 AI 工具从素材处理到成片输出的视频制作工作流。",
          category: "视频工作流",
          videoPath: "assets/videos/media-03.mp4",
          posterPath: "assets/posters/media-03.jpg",
          hasLocalVideo: true,
          hasPoster: false,
          aspectRatio: "1280 / 720",
          externalUrl: "https://v.douyin.com/cQdW13xl2FQ/"
        },
        {
          id: "media-04",
          title: "Skill 竟然开智了？！",
          description: "演示多个 AI Skill 协同完成剧本、角色、场景与视频制作流程。",
          category: "Skill 协同创作",
          videoPath: "assets/videos/media-04.mp4",
          posterPath: "assets/posters/media-04.jpg",
          hasLocalVideo: true,
          hasPoster: false,
          aspectRatio: "1920 / 1080",
          externalUrl: "https://v.douyin.com/qtUI5vQJAuE/"
        }
      ]
    },
    {
      id: "little-orange-fox",
      title: "《勇敢的狐狸小橙》",
      indexTitle: "勇敢的狐狸小橙",
      category: "原创 AI 动画短片",
      categoryShort: "原创动画",
      subtitle: "本科期间独立创作",
      description: "2025年6月，本科大三期间首次接触 AI 生成技术，并独立创作了原创 AI 动画短片《勇敢的狐狸小橙》。",
      responsibilities: "创意设计、角色与场景视觉开发、影视分镜、AI 视频生成、后期制作。",
      specifications: "1280 × 720 / 约 30 fps / 约 3 分 05 秒",
      awards: [
        { competition: "釜山国际艺术节国际 AIGC 视觉设计大赛", award: "杰出成就奖" },
        { competition: "北京市大学生动漫设计大赛（AI 生成）", award: "三等奖" }
      ],
      videoPath: "assets/videos/little-orange-fox.mp4",
      posterPath: "assets/posters/little-orange-fox.jpg",
      hasLocalVideo: true,
      hasPoster: false,
      aspectRatio: "1280 / 720",
      externalUrl: "https://www.bilibili.com/video/BV1MLCFBsEVx?vd_source=4adfa0a7bb64a1728a82844e4eee3632"
    }
  ]
};
