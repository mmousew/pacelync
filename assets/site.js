const header = document.querySelector('[data-header]');
const button = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-mobile-menu]');
const updateHeader = () => header && header.classList.toggle('scrolled', scrollY > 24);
updateHeader();
addEventListener('scroll', updateHeader, { passive: true });
if (button && menu) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', open);
    menu.classList.toggle('open', open);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }));
}

const languageButton = document.querySelector('[data-language-toggle]');
const translations = [
  ['.skip', 'Skip to content', '跳转到正文'],
  ['.nav a:nth-child(1),.mobile-nav a:nth-child(1)', 'Why China', '为什么是中国'],
  ['.nav a:nth-child(2),.mobile-nav a:nth-child(2)', 'Destinations', '目的地'],
  ['.nav a:nth-child(3),.mobile-nav a:nth-child(3)', 'How it works', '如何开始'],
  ['.nav a:nth-child(4),.mobile-nav a:nth-child(4)', 'Contact', '联系我们'],
  ['.header-cta', 'Plan a trip ↗', '我想去 ↗'],
  ['.hero .eyebrow', '<i></i> PaceLync Travel · China travel planning', '<i></i> PaceLync Travel · 中国旅行规划'],
  ['.hero h1', 'See China at<br><em>your own pace.</em>', '按自己的节奏，<br><em>看见中国。</em>'],
  ['.hero .lede', 'PaceLync Travel helps international visitors turn a first trip to China into a clear, comfortable, and memorable journey.', 'PaceLync Travel 帮助外国游客把第一次中国之旅，变成清晰、舒适且值得记住的旅程。'],
  ['.hero .button', 'Explore destinations ↓', '探索目的地 ↓'],
  ['.hero .email', 'Start an inquiry ↗', '我想去 ↗'],
  ['.travel-board-top b', 'Journey board', '旅行路线板'],
  ['.travel-board-bottom small', 'START WITH', '从这里开始'],
  ['.travel-board-bottom strong', 'One city.<br>Then see where it leads.', '先看一座城。<br>再决定下一站。'],
  ['.travel-image span', '01 — Beijing', '01 — 北京'],
  ['.hero-foot span:nth-child(1)', '10 cities to begin', '10 座城市可选'],
  ['.hero-foot span:nth-child(3)', 'Flexible routes', '灵活路线'],
  ['.hero-foot span:nth-child(5)', 'Human guidance', '人工咨询'],
  ['#why .label', '<b>01</b> Why China', '<b>01</b> 为什么是中国'],
  ['#why h2', 'A country of<br>many rhythms.', '一片拥有<br>多种节奏的土地。'],
  ['#why .section-copy p:nth-of-type(1)', 'China rewards travelers who leave room for contrast: imperial courtyards in the morning, a neighborhood noodle shop at noon, and a city glowing after dark.', '中国适合给变化留出空间：早晨走进皇城庭院，中午在街边面馆吃饭，夜晚看城市亮起灯光。'],
  ['#why .section-copy p:nth-of-type(2)', 'We make the first decisions easier for visitors from abroad, with practical city starting points, route ideas, and a simple email conversation before you book.', '我们为外国游客整理实用的城市起点和路线想法，在你预订前，先通过一封邮件把旅行方向聊清楚。'],
  ['#why .travel-points span:nth-child(1)', '<b>10</b> city starting points', '<b>10</b> 个城市起点'],
  ['#why .travel-points span:nth-child(2)', '<b>01</b> clear inquiry path', '<b>01</b> 条清晰咨询路径'],
  ['#why .travel-points span:nth-child(3)', '<b>∞</b> ways to shape a route', '<b>∞</b> 种路线组合方式'],
  ['#destinations .label', '<b>02</b> Destinations', '<b>02</b> 目的地'],
  ['#destinations .section-title h2', 'Ten cities.<br>One unforgettable first trip.', '十座城市。<br>一段难忘的第一次中国之旅。'],
  ['#destinations .city-card:nth-child(1) .city-meta', 'NORTH CHINA · HISTORY', '中国北方 · 历史'],
  ['#destinations .city-card:nth-child(1) h3', 'Beijing', '北京'],
  ['#destinations .city-card:nth-child(1) p', 'Imperial courtyards, the Great Wall, hutong lanes, and a city built for long walks.', '皇城庭院、长城、胡同小巷，以及适合慢慢行走的城市。'],
  ['#destinations .city-card:nth-child(1) .city-card-copy > a', 'Ask about Beijing ↗', '我想去北京 ↗'],
  ['#destinations .city-card:nth-child(2) .city-meta', 'EAST CHINA · CITY LIFE', '中国东部 · 城市生活'],
  ['#destinations .city-card:nth-child(2) h3', 'Shanghai', '上海'],
  ['#destinations .city-card:nth-child(2) p', 'Riverside views, Art Deco streets, lively neighborhoods, and a modern Chinese pulse.', '江畔风景、装饰艺术街区、活力社区，以及现代中国的城市脉搏。'],
  ['#destinations .city-card:nth-child(2) .city-card-copy > a', 'Ask about Shanghai ↗', '我想去上海 ↗'],
  ['#destinations .city-card:nth-child(3) .city-meta', 'SOUTH CHINA · FOOD', '中国南方 · 美食'],
  ['#destinations .city-card:nth-child(3) h3', 'Guangzhou', '广州'],
  ['#destinations .city-card:nth-child(3) p', 'Cantonese flavors, the Pearl River at dusk, arcades, markets, and warm southern energy.', '粤菜风味、暮色中的珠江、骑楼、市场和温暖的南方气息。'],
  ['#destinations .city-card:nth-child(3) .city-card-copy > a', 'Ask about Guangzhou ↗', '我想去广州 ↗'],
  ['#destinations .city-card:nth-child(4) .city-meta', 'SOUTH CHINA · MODERN', '中国南方 · 现代城市'],
  ['#destinations .city-card:nth-child(4) h3', 'Shenzhen', '深圳'],
  ['#destinations .city-card:nth-child(4) p', 'A fast-moving coastal city for design, architecture, parks, and contemporary culture.', '一座节奏明快的海滨城市，适合探索设计、建筑、公园和当代文化。'],
  ['#destinations .city-card:nth-child(4) .city-card-copy > a', 'Ask about Shenzhen ↗', '我想去深圳 ↗'],
  ['#destinations .city-card:nth-child(5) .city-meta', 'CENTRAL CHINA · ANCIENT', '中国中部 · 古都'],
  ['#destinations .city-card:nth-child(5) h3', "Xi'an", '西安'],
  ['#destinations .city-card:nth-child(5) p', 'Walk the old city wall, meet the Terracotta Army, and taste the starting point of the Silk Road.', '走上古城墙，近距离看兵马俑，品尝丝绸之路起点的风味。'],
  ['#destinations .city-card:nth-child(5) .city-card-copy > a', "Ask about Xi'an ↗", '我想去西安 ↗'],
  ['#destinations .city-card:nth-child(6) .city-meta', 'SOUTHWEST · SLOW DAYS', '中国西南 · 慢生活'],
  ['#destinations .city-card:nth-child(6) h3', 'Chengdu', '成都'],
  ['#destinations .city-card:nth-child(6) p', 'Giant pandas, tea houses, spicy food, and an easygoing pace that invites you to stay longer.', '大熊猫、茶馆、辛香美食，以及让人愿意多停留几天的松弛节奏。'],
  ['#destinations .city-card:nth-child(6) .city-card-copy > a', 'Ask about Chengdu ↗', '我想去成都 ↗'],
  ['#destinations .city-card:nth-child(7) .city-meta', 'EAST CHINA · LAKESIDE', '中国东部 · 湖畔'],
  ['#destinations .city-card:nth-child(7) h3', 'Hangzhou', '杭州'],
  ['#destinations .city-card:nth-child(7) p', 'West Lake walks, tea country, quiet gardens, and a softer side of the modern east.', '西湖漫步、茶乡、静谧园林，以及现代东部更柔和的一面。'],
  ['#destinations .city-card:nth-child(7) .city-card-copy > a', 'Ask about Hangzhou ↗', '我想去杭州 ↗'],
  ['#destinations .city-card:nth-child(8) .city-meta', 'SOUTHWEST · NIGHT LIGHTS', '中国西南 · 夜景'],
  ['#destinations .city-card:nth-child(8) h3', 'Chongqing', '重庆'],
  ['#destinations .city-card:nth-child(8) p', "Mountain streets, hotpot, river views, and one of China's most cinematic city nights.", '山城街道、火锅、江景，以及中国最具电影感的城市夜晚之一。'],
  ['#destinations .city-card:nth-child(8) .city-card-copy > a', 'Ask about Chongqing ↗', '我想去重庆 ↗'],
  ['#destinations .city-card:nth-child(9) .city-meta', 'EAST CHINA · GARDENS', '中国东部 · 园林'],
  ['#destinations .city-card:nth-child(9) h3', 'Suzhou', '苏州'],
  ['#destinations .city-card:nth-child(9) p', 'Classical gardens, canal towns, silk traditions, and a slower counterpoint to Shanghai.', '古典园林、水乡、丝绸传统，以及相较上海更慢的旅行节奏。'],
  ['#destinations .city-card:nth-child(9) .city-card-copy > a', 'Ask about Suzhou ↗', '我想去苏州 ↗'],
  ['#destinations .city-card:nth-child(10) .city-meta', 'SOUTH CHINA · LANDSCAPE', '中国南方 · 山水'],
  ['#destinations .city-card:nth-child(10) h3', 'Guilin', '桂林'],
  ['#destinations .city-card:nth-child(10) p', 'Li River boats, misty karst peaks, and a landscape that feels lifted from an ink painting.', '漓江舟行、烟雨喀斯特山峰，以及仿佛从水墨画中走出的山水。'],
  ['#destinations .city-card:nth-child(10) .city-card-copy > a', 'Ask about Guilin ↗', '我想去桂林 ↗'],
  ['#how .label', '<b>03</b> How it works', '<b>03</b> 如何开始'],
  ['#how .principles-copy h2', 'Start small.<br>Shape the route.', '从一座城开始。<br>慢慢定下路线。'],
  ['#how .principles-copy > p', 'You do not need a perfect itinerary before reaching out. Tell us what you want to see, how long you have, and what kind of pace feels right.', '联系之前不需要准备好一份完美行程。告诉我们想看什么、计划几天，以及你喜欢怎样的旅行节奏。'],
  ['#how article:nth-child(1) h3', 'Send a simple note', '发来一封简单的邮件'],
  ['#how article:nth-child(1) p', 'Share your preferred dates, starting city, and the places or experiences you are curious about.', '告诉我们出行日期、起始城市，以及你感兴趣的地点或体验。'],
  ['#how article:nth-child(2) h3', 'Choose your starting point', '选择你的第一站'],
  ['#how article:nth-child(2) p', 'Use the ten city guides above to find a first stop, then build outward from there.', '从上面的十座城市中找到第一站，再从那里延伸路线。'],
  ['#how article:nth-child(3) h3', 'Make the journey yours', '让旅程真正属于你'],
  ['#how article:nth-child(3) p', 'We can continue the conversation by email so the route matches your time, interests, and comfort level.', '我们可以继续通过邮件沟通，让路线符合你的时间、兴趣和舒适度。'],
  ['#contact .eyebrow', '<i></i> Plan a China journey', '<i></i> 规划一段中国之旅'],
  ['#contact h2', 'Ready to find your<br><em>first city?</em>', '准备好找到你的<br><em>第一座城市了吗？</em>'],
  ['#contact > .shell > p:not(.eyebrow)', 'Send us a note with your dates, interests, and where you are traveling from. We will use email to discuss the next step.', '把出行日期、兴趣和出发地告诉我们。我们会通过邮件和你讨论下一步。'],
  ['.company-details > div:nth-child(1) small', 'Travel studio', '旅行工作室'],
  ['.company-details > div:nth-child(2) small', 'Based in', '公司地址'],
  ['.footer-grid > div:first-child > p', 'China travel planning for international visitors.', '为外国游客提供中国旅行规划。'],
  ['.footer-grid > div:nth-child(2) h3', 'Explore', '探索'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(1)', 'Why China', '为什么是中国'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(2)', 'Destinations', '目的地'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(3)', 'How it works', '如何开始'],
  ['.footer-grid > div:nth-child(3) h3', 'Legal', '法律信息'],
  ['.footer-grid > div:nth-child(3) a:nth-of-type(1)', 'Privacy Policy', '隐私政策'],
  ['.footer-grid > div:nth-child(3) a:nth-of-type(2)', 'Terms of Use', '使用条款'],
  ['.footer-grid > div:nth-child(4) h3', 'Contact', '联系方式'],
  ['body[data-page="home"] .footer-bottom > span:last-child', 'China travel planning · Photo references: Unsplash', '中国旅行规划 · 图片来源：Unsplash']
];

const pageType = document.body.dataset.page || 'home';
const legalHero = document.querySelector('.legal-hero .shell');
const legalContent = document.querySelector('.legal-content');
const legalEnglish = legalHero && legalContent ? { hero: legalHero.innerHTML, content: legalContent.innerHTML } : null;
const legalChinese = {
  privacy: {
    title: '隐私政策｜PaceLync',
    description: 'PaceLync 隐私政策，说明公司网站如何处理访客信息。',
    hero: '<p class="eyebrow"><i></i> 法律信息</p><h1>隐私政策</h1><p>最后更新：2026 年 9 月 9 日</p>',
    content: `<p>本隐私政策说明您访问 PaceLync LLC 公司网站或联系我们时，我们如何处理相关信息。本网站用于介绍公司情况，无需注册账户即可浏览。</p>
      <h2>您主动提供的信息</h2><p>当您通过电子邮件联系我们时，我们会收到邮件中包含的信息，例如您的姓名、电子邮箱地址以及您主动提供的其他内容。我们仅将这些信息用于回复咨询和保存必要的业务记录。</p>
      <h2>网站技术数据</h2><p>本网站不使用广告 Cookie，也不出售个人信息。网站托管服务商可能会处理 IP 地址、浏览器类型、访问页面和时间等基础技术数据，用于传输网页、维护安全和排查技术问题。</p>
      <h2>信息使用方式</h2><ul><li>回复业务、产品及支持咨询。</li><li>运行、保护和改进本网站。</li><li>履行适用法律规定的义务。</li></ul>
      <h2>共享与保留</h2><p>我们不会出售个人信息。仅在运营网站和通信所必需时，我们可能与服务提供商共享有限信息；法律要求时也可能依法披露。信息仅在实现收集目的或满足合法记录要求所需的期限内保留。</p>
      <h2>您的权利与选择</h2><p>在适用法律范围内，您可以要求访问、更正或删除曾向我们提供的个人信息。部分信息可能因履行法律义务或维护合法业务记录而需要继续保留。</p>
      <h2>Cookie 与类似技术</h2><p>PaceLync LLC 公司网站不使用广告 Cookie 或跨站追踪技术。网站可能使用必要的本地存储来记住语言偏好，并提供核心页面功能。</p>
      <h2>信息安全</h2><p>我们采取合理的管理和技术措施，防止信息遭到未经授权的访问、丢失、滥用或篡改。但任何互联网传输或存储系统都无法保证绝对安全。</p>
      <h2>国际访问</h2><p>如果您从网站托管服务商所在地区之外访问本网站，相关技术信息可能在其他国家或地区处理。我们会合理选择能够提供适当安全保障的服务商。</p>
      <h2>未成年人</h2><p>本公司网站不面向 13 周岁以下儿童，我们也不会通过本网站主动收集儿童个人信息。</p>
      <h2>政策更新</h2><p>随着网站或业务方式变化，我们可能更新本政策。页面顶部的日期代表当前版本的最近更新时间。</p>
      <h2>联系我们</h2><p>如对本政策有任何疑问，请发送邮件至 <a href="mailto:contact@pacelync.com">contact@pacelync.com</a>，或联系 PaceLync LLC，地址：30 N Gould St Ste N, Sheridan, WY 82801, United States。</p>`
  },
  terms: {
    title: '使用条款｜PaceLync',
    description: 'PaceLync 公司网站使用条款。',
    hero: '<p class="eyebrow"><i></i> 法律信息</p><h1>使用条款</h1><p>最后更新：2026 年 9 月 9 日</p>',
    content: `<p>本使用条款适用于您对 PaceLync LLC 公司网站的访问和使用。继续访问本网站即表示您同意遵守这些条款。</p>
      <h2>网站用途</h2><p>本网站用于提供 PaceLync 的公司信息、业务能力和软件开发理念。网站内容可能根据业务情况更新、调整或移除。</p>
      <h2>允许的使用方式</h2><p>您可以浏览本网站，并基于合法的业务目的联系我们。您不得干扰网站运行、未经授权访问系统、植入恶意代码，或以违反适用法律的方式使用本网站。</p>
      <h2>账户与购买</h2><p>本公司网站目前不提供用户账户、付费订阅或在线购买。未来如推出具体产品或服务，我们将在使用相关服务前另行提供适用条款。</p>
      <h2>知识产权</h2><p>PaceLync 名称、视觉标识、网站设计、文字和原创材料归 PaceLync LLC 所有或经合法授权使用。除为正常浏览本网站所必需的有限权利外，本条款不授予任何其他权利。</p>
      <h2>第三方服务</h2><p>本网站可能依赖第三方托管服务，或包含指向第三方网站的链接。第三方服务拥有各自的条款和隐私政策，PaceLync LLC 不对其内容、安全性或可用性负责。</p>
      <h2>免责声明</h2><p>本网站按现状和现有可用状态提供。在法律允许的范围内，PaceLync LLC 不保证网站始终不中断、内容始终完整或不存在技术错误。</p>
      <h2>责任限制</h2><p>在适用法律允许的范围内，PaceLync LLC 不对因访问或使用本信息网站而产生的间接、附带、特殊或后果性损失承担责任。</p>
      <h2>赔偿责任</h2><p>在法律允许的范围内，如果您违法滥用本网站或严重违反本条款，应对由此造成的损失承担相应责任。</p>
      <h2>可用性与终止</h2><p>在合理必要时，我们可以修改、暂停或停止网站的部分功能。如有合理理由认为网站遭到滥用或面临安全风险，我们可能限制相关访问。</p>
      <h2>条款可分割性</h2><p>如本条款中的某项规定被认定为不可执行，其余规定仍将在法律允许的最大范围内继续有效。</p>
      <h2>条款更新</h2><p>我们可能不时更新这些条款。条款更新后继续使用本网站，即表示接受更新后的版本。</p>
      <h2>联系我们</h2><p>如对本条款有任何疑问，请发送邮件至 <a href="mailto:contact@pacelync.com">contact@pacelync.com</a>，或联系 PaceLync LLC，地址：30 N Gould St Ste N, Sheridan, WY 82801, United States。</p>`
  }
};

function applyLanguage(language) {
  const chinese = language === 'zh';
  document.documentElement.lang = chinese ? 'zh-CN' : 'en';
  const description = document.querySelector('meta[name="description"]');
  if (pageType === 'home') {
    document.title = chinese ? 'PaceLync Travel｜按自己的节奏看见中国' : 'PaceLync Travel | China, at your own pace';
    if (description) description.content = chinese ? 'PaceLync Travel 为外国游客提供中国城市旅行规划和咨询。' : 'PaceLync Travel helps international visitors plan thoughtful journeys through China.';
  } else if (legalEnglish && legalChinese[pageType]) {
    const localized = legalChinese[pageType];
    legalHero.innerHTML = chinese ? localized.hero : legalEnglish.hero;
    legalContent.innerHTML = chinese ? localized.content : legalEnglish.content;
    document.title = chinese ? localized.title : pageType === 'privacy' ? 'Privacy Policy | PaceLync LLC' : 'Terms of Use | PaceLync LLC';
    if (description) description.content = chinese ? localized.description : pageType === 'privacy' ? 'PaceLync LLC Privacy Policy' : 'PaceLync LLC Terms of Use';
  }
  translations.forEach(([selector, english, chineseText]) => document.querySelectorAll(selector).forEach(node => node.innerHTML = chinese ? chineseText : english));
  document.querySelectorAll('.legal-footer-links').forEach(node => node.innerHTML = chinese ? '<a href="privacy.html">隐私政策</a> · <a href="terms.html">使用条款</a>' : '<a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a>');
  const labels = languageButton.querySelectorAll('span');
  labels[0].classList.toggle('active', !chinese);
  labels[1].classList.toggle('active', chinese);
  languageButton.setAttribute('aria-label', chinese ? '切换到英文' : 'Switch to Chinese');
  localStorage.setItem('pacelync-language', language);
}

if (languageButton) {
  let language = localStorage.getItem('pacelync-language') === 'zh' ? 'zh' : 'en';
  applyLanguage(language);
  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    applyLanguage(language);
  });
}
document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
const nodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  nodes.forEach(node => observer.observe(node));
} else nodes.forEach(node => node.classList.add('visible'));
