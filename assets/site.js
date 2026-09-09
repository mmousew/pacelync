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
  ['.nav a:nth-child(1),.mobile-nav a:nth-child(1)', 'Company', '公司介绍'],
  ['.nav a:nth-child(2),.mobile-nav a:nth-child(2)', 'Capabilities', '业务能力'],
  ['.nav a:nth-child(3),.mobile-nav a:nth-child(3)', 'Principles', '产品原则'],
  ['.nav a:nth-child(4),.mobile-nav a:nth-child(4)', 'Contact', '联系我们'],
  ['.header-cta', 'Get in touch ↗', '联系我们 ↗'],
  ['.hero .eyebrow', '<i></i> Independent software company', '<i></i> 独立软件公司'],
  ['.hero h1', 'Software that makes<br><em>work feel lighter.</em>', '让工作更简单，<br><em>让想法走得更远。</em>'],
  ['.hero .lede', 'PaceLync designs and develops focused digital products for people who value clarity, momentum, and thoughtful craft.', 'PaceLync 设计并开发专注、可靠的数字产品，为重视清晰、高效与产品品质的人提供更好的工作体验。'],
  ['.hero .button', 'Discover PaceLync ↓', '了解 PaceLync ↓'],
  ['.app-head > span', '<i></i> In focus', '<i></i> 专注中'],
  ['.app-main > small', 'TODAY', '今天'],
  ['.app-main h2', 'Move one idea<br>forward.', '让一个想法<br>向前一步。'],
  ['.task:not(.muted) b', 'Shape the next release', '规划下一个版本'],
  ['.task:not(.muted) small', 'Product planning · 10:30', '产品规划 · 10:30'],
  ['.task.muted b', 'Review customer notes', '整理用户反馈'],
  ['.task.muted small', 'Research · This afternoon', '用户研究 · 今天下午'],
  ['.progress-copy span', 'Weekly momentum', '本周进度'],
  ['.note span', 'Designed around attention,<br>not distraction.', '围绕专注而设计，<br>远离无谓干扰。'],
  ['.hero-foot span:nth-child(1)', 'Product strategy', '产品策略'],
  ['.hero-foot span:nth-child(3)', 'Apple platforms', 'Apple 平台'],
  ['.hero-foot span:nth-child(5)', 'Web experiences', '网页体验'],
  ['#company .label', '<b>01</b> Company', '<b>01</b> 公司介绍'],
  ['#company h2', 'Small by design.<br>Serious about the details.', '保持精简，<br>认真对待每个细节。'],
  ['#company .section-copy p:nth-of-type(1)', 'PaceLync is an independent software company creating practical products for modern knowledge work. We turn complex workflows into calm, dependable experiences that people can understand and trust.', 'PaceLync 是一家独立软件公司，专注于为现代知识工作打造实用产品。我们把复杂的工作流程转化为清晰、可靠、易于理解和信任的数字体验。'],
  ['#company .section-copy p:nth-of-type(2)', 'Our work spans product strategy, interface design, engineering, and long-term product stewardship. We build deliberately, protect user attention, and prefer useful progress over feature noise.', '我们的工作涵盖产品策略、界面设计、软件工程与产品的长期维护。我们审慎构建每项功能，尊重用户的注意力，并始终让实际价值优先于功能堆砌。'],
  ['#capabilities .label', '<b>02</b> Capabilities', '<b>02</b> 业务能力'],
  ['#capabilities .section-title h2', 'From a clear idea<br>to dependable software.', '从清晰的想法，<br>到可靠的软件。'],
  ['#capabilities .card:nth-child(1) h3', 'Product strategy', '产品策略'],
  ['#capabilities .card:nth-child(1) p', 'Focused product definition, user flows, prototypes, and clear priorities before code becomes expensive.', '在进入高成本开发前，完成清晰的产品定义、用户流程、原型设计与优先级规划。'],
  ['#capabilities .card:nth-child(2) h3', 'Apple platforms', 'Apple 平台开发'],
  ['#capabilities .card:nth-child(2) p', 'Native experiences for iPhone, iPad, and Mac, designed around platform conventions and real user needs.', '面向 iPhone、iPad 与 Mac 打造原生体验，遵循平台规范，也忠于真实的用户需求。'],
  ['#capabilities .card:nth-child(3) h3', 'Web experiences', '网页与应用体验'],
  ['#capabilities .card:nth-child(3) p', 'Responsive websites and web applications that are fast, accessible, maintainable, and easy to use.', '构建快速、易用、兼顾无障碍并便于长期维护的响应式网站与 Web 应用。'],
  ['#principles .label', '<b>03</b> Principles', '<b>03</b> 产品原则'],
  ['#principles .principles-copy h2', 'How we make<br>product decisions.', '我们如何做出<br>产品决策。'],
  ['#principles .principles-copy > p', "Good software earns a place in someone's day. These principles guide what we build and what we leave out.", '好的软件值得成为日常生活的一部分。这些原则决定我们构建什么，也决定我们舍弃什么。'],
  ['#principles article:nth-child(1) h3', 'Clarity over clutter', '清晰胜过堆砌'],
  ['#principles article:nth-child(1) p', 'Every screen should make the next useful action easier to see.', '每一个界面，都应该让用户更容易看见下一步有价值的行动。'],
  ['#principles article:nth-child(2) h3', 'Privacy by default', '默认保护隐私'],
  ['#principles article:nth-child(2) p', 'Collect less, explain clearly, and treat user information with care.', '尽量少收集数据，清楚说明用途，并谨慎对待每一份用户信息。'],
  ['#principles article:nth-child(3) h3', 'Built for the long term', '为长期使用而构建'],
  ['#principles article:nth-child(3) p', 'Reliable foundations, restrained choices, and continuous improvement.', '以可靠的基础、克制的选择和持续的改进，让产品经得起时间。'],
  ['#contact .eyebrow', '<i></i> Business &amp; developer relations', '<i></i> 商务与开发者合作'],
  ['#contact h2', 'Let’s build something<br><em>worth keeping.</em>', '一起打造真正<br><em>值得长期使用的产品。</em>'],
  ['#contact > .shell > p:not(.eyebrow)', 'For company, product, partnership, or developer program inquiries, contact PaceLync directly.', '如有公司业务、产品合作、商务伙伴或开发者计划相关咨询，欢迎直接联系 PaceLync。'],
  ['.footer-grid > div:first-child > p', 'Thoughtful software for modern work.', '为现代工作打造用心的软件。'],
  ['.footer-grid > div:nth-child(2) h3', 'Company', '公司'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(1)', 'About', '关于我们'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(2)', 'Capabilities', '业务能力'],
  ['.footer-grid > div:nth-child(2) a:nth-of-type(3)', 'Contact', '联系我们'],
  ['.footer-grid > div:nth-child(3) h3', 'Legal', '法律信息'],
  ['.footer-grid > div:nth-child(3) a:nth-of-type(1)', 'Privacy Policy', '隐私政策'],
  ['.footer-grid > div:nth-child(3) a:nth-of-type(2)', 'Terms of Use', '使用条款'],
  ['.footer-grid > div:nth-child(4) h3', 'Contact', '联系方式'],
  ['body[data-page="home"] .footer-bottom > span:last-child', 'Independent software company', '独立软件公司']
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
    content: `<p>本隐私政策说明您访问 PaceLync 公司网站或联系我们时，我们如何处理相关信息。本网站用于介绍公司情况，无需注册账户即可浏览。</p>
      <h2>您主动提供的信息</h2><p>当您通过电子邮件联系我们时，我们会收到邮件中包含的信息，例如您的姓名、电子邮箱地址以及您主动提供的其他内容。我们仅将这些信息用于回复咨询和保存必要的业务记录。</p>
      <h2>网站技术数据</h2><p>本网站不使用广告 Cookie，也不出售个人信息。网站托管服务商可能会处理 IP 地址、浏览器类型、访问页面和时间等基础技术数据，用于传输网页、维护安全和排查技术问题。</p>
      <h2>信息使用方式</h2><ul><li>回复业务、产品及支持咨询。</li><li>运行、保护和改进本网站。</li><li>履行适用法律规定的义务。</li></ul>
      <h2>共享与保留</h2><p>我们不会出售个人信息。仅在运营网站和通信所必需时，我们可能与服务提供商共享有限信息；法律要求时也可能依法披露。信息仅在实现收集目的或满足合法记录要求所需的期限内保留。</p>
      <h2>您的权利与选择</h2><p>在适用法律范围内，您可以要求访问、更正或删除曾向我们提供的个人信息。部分信息可能因履行法律义务或维护合法业务记录而需要继续保留。</p>
      <h2>Cookie 与类似技术</h2><p>PaceLync 公司网站不使用广告 Cookie 或跨站追踪技术。网站可能使用必要的本地存储来记住语言偏好，并提供核心页面功能。</p>
      <h2>信息安全</h2><p>我们采取合理的管理和技术措施，防止信息遭到未经授权的访问、丢失、滥用或篡改。但任何互联网传输或存储系统都无法保证绝对安全。</p>
      <h2>国际访问</h2><p>如果您从网站托管服务商所在地区之外访问本网站，相关技术信息可能在其他国家或地区处理。我们会合理选择能够提供适当安全保障的服务商。</p>
      <h2>未成年人</h2><p>本公司网站不面向 13 周岁以下儿童，我们也不会通过本网站主动收集儿童个人信息。</p>
      <h2>政策更新</h2><p>随着网站或业务方式变化，我们可能更新本政策。页面顶部的日期代表当前版本的最近更新时间。</p>
      <h2>联系我们</h2><p>如对本政策有任何疑问，请发送邮件至 <a href="mailto:contact@pacelync.com">contact@pacelync.com</a>。</p>`
  },
  terms: {
    title: '使用条款｜PaceLync',
    description: 'PaceLync 公司网站使用条款。',
    hero: '<p class="eyebrow"><i></i> 法律信息</p><h1>使用条款</h1><p>最后更新：2026 年 9 月 9 日</p>',
    content: `<p>本使用条款适用于您对 PaceLync 公司网站的访问和使用。继续访问本网站即表示您同意遵守这些条款。</p>
      <h2>网站用途</h2><p>本网站用于提供 PaceLync 的公司信息、业务能力和软件开发理念。网站内容可能根据业务情况更新、调整或移除。</p>
      <h2>允许的使用方式</h2><p>您可以浏览本网站，并基于合法的业务目的联系我们。您不得干扰网站运行、未经授权访问系统、植入恶意代码，或以违反适用法律的方式使用本网站。</p>
      <h2>账户与购买</h2><p>本公司网站目前不提供用户账户、付费订阅或在线购买。未来如推出具体产品或服务，我们将在使用相关服务前另行提供适用条款。</p>
      <h2>知识产权</h2><p>PaceLync 名称、视觉标识、网站设计、文字和原创材料归 PaceLync 所有或经合法授权使用。除为正常浏览本网站所必需的有限权利外，本条款不授予任何其他权利。</p>
      <h2>第三方服务</h2><p>本网站可能依赖第三方托管服务，或包含指向第三方网站的链接。第三方服务拥有各自的条款和隐私政策，PaceLync 不对其内容、安全性或可用性负责。</p>
      <h2>免责声明</h2><p>本网站按现状和现有可用状态提供。在法律允许的范围内，PaceLync 不保证网站始终不中断、内容始终完整或不存在技术错误。</p>
      <h2>责任限制</h2><p>在适用法律允许的范围内，PaceLync 不对因访问或使用本信息网站而产生的间接、附带、特殊或后果性损失承担责任。</p>
      <h2>赔偿责任</h2><p>在法律允许的范围内，如果您违法滥用本网站或严重违反本条款，应对由此造成的损失承担相应责任。</p>
      <h2>可用性与终止</h2><p>在合理必要时，我们可以修改、暂停或停止网站的部分功能。如有合理理由认为网站遭到滥用或面临安全风险，我们可能限制相关访问。</p>
      <h2>条款可分割性</h2><p>如本条款中的某项规定被认定为不可执行，其余规定仍将在法律允许的最大范围内继续有效。</p>
      <h2>条款更新</h2><p>我们可能不时更新这些条款。条款更新后继续使用本网站，即表示接受更新后的版本。</p>
      <h2>联系我们</h2><p>如对本条款有任何疑问，请发送邮件至 <a href="mailto:contact@pacelync.com">contact@pacelync.com</a>。</p>`
  }
};

function applyLanguage(language) {
  const chinese = language === 'zh';
  document.documentElement.lang = chinese ? 'zh-CN' : 'en';
  const description = document.querySelector('meta[name="description"]');
  if (pageType === 'home') {
    document.title = chinese ? 'PaceLync｜为现代工作打造用心的软件' : 'PaceLync | Thoughtful software for modern work';
    if (description) description.content = chinese ? 'PaceLync 是一家独立软件公司，专注于为现代工作打造清晰、可靠的数字产品。' : 'PaceLync is an independent software company building focused, reliable tools for modern work.';
  } else if (legalEnglish && legalChinese[pageType]) {
    const localized = legalChinese[pageType];
    legalHero.innerHTML = chinese ? localized.hero : legalEnglish.hero;
    legalContent.innerHTML = chinese ? localized.content : legalEnglish.content;
    document.title = chinese ? localized.title : pageType === 'privacy' ? 'Privacy Policy | PaceLync' : 'Terms of Use | PaceLync';
    if (description) description.content = chinese ? localized.description : pageType === 'privacy' ? 'PaceLync Privacy Policy' : 'PaceLync Terms of Use';
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
