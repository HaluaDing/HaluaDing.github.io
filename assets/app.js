const profileUrl = './data/profile.json';

const create = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderInlineMarkdown = (element, text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  parts.forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      element.append(create('strong', '', part.slice(2, -2)));
      return;
    }
    element.append(document.createTextNode(part));
  });
};

const renderStats = (stats) => {
  const container = document.querySelector('#stats');
  stats.forEach((item) => {
    const stat = create('article', 'stat');
    stat.append(create('strong', '', item.value), create('span', '', item.label));
    container.append(stat);
  });
};

const renderSkills = (skills) => {
  const container = document.querySelector('#skills');
  skills.forEach((skill) => container.append(create('span', 'pill', skill)));
};

const renderEducation = (items) => {
  const container = document.querySelector('#education-list');
  items.forEach((item) => {
    const article = create('article', 'education-item');
    const main = create('div');
    main.append(create('span', 'time', item.period));
    main.append(create('h3', '', item.school));
    main.append(create('p', 'role', item.degree));
    main.append(create('p', '', item.college + ' · ' + item.location));

    const detail = create('div', 'education-detail');
    detail.append(create('p', '', '研究方向：' + item.focus));
    detail.append(create('p', '', '主修课程：' + item.courses));
    article.append(main, detail);
    container.append(article);
  });
};

const renderResearch = (items) => {
  const container = document.querySelector('#research-list');
  items.forEach((item) => {
    const article = create('article', 'card');
    article.append(create('p', 'card-kicker', item.type || item.role || 'Research'));
    article.append(create('h3', '', item.title));
    const detail = create('p');
    renderInlineMarkdown(detail, item.detail || item.summary);
    article.append(detail);
    const meta = item.meta || item.period;
    if (meta) article.append(create('span', 'meta', meta));
    container.append(article);
  });
};

const renderProjects = (items) => {
  const container = document.querySelector('#projects-list');
  items.forEach((item) => {
    const article = create('article', 'timeline-item');
    const time = create('span', 'time', item.period);
    const title = create('h3', '', item.title);
    const role = create('p', 'role', item.role);
    const summary = create('p', '', item.summary);
    article.append(time, title, role, summary);
    container.append(article);
  });
};

const renderAchievements = (items) => {
  const container = document.querySelector('#achievements-list');
  items.forEach((item) => {
    const article = create('article', 'achievement');
    article.append(create('h3', '', item.title));
    if (Array.isArray(item.detail)) {
      const list = create('div', 'achievement-lines');
      item.detail.forEach((detail) => list.append(create('p', '', detail)));
      article.append(list);
    } else {
      article.append(create('p', '', item.detail));
    }
    container.append(article);
  });
};

const renderContact = (links) => {
  const container = document.querySelector('#contact-links');
  links.forEach((link) => {
    if (link.type === 'copy') {
      const button = create('button', 'contact-link copy-link', link.label);
      button.type = 'button';
      button.addEventListener('click', async () => {
        await navigator.clipboard.writeText(link.value);
        button.textContent = '已复制: ' + link.value;
        setTimeout(() => {
          button.textContent = link.label;
        }, 1600);
      });
      container.append(button);
      return;
    }

    const anchor = create('a', 'contact-link', link.label);
    anchor.href = link.href;
    container.append(anchor);
  });
};

const renderName = (name) => {
  const title = document.querySelector('#hero-title');
  title.textContent = '';
  name.split(' · ').forEach((part) => {
    title.append(create('span', 'name-line', part));
  });
};

const renderProfile = async () => {
  const response = await fetch(profileUrl);
  const profile = await response.json();

  document.querySelector('#hero-school').textContent = profile.current;
  renderName(profile.name);
  document.querySelector('#hero-subtitle').textContent = profile.tagline;
  document.querySelector('#about-text').textContent = profile.about;
  document.querySelector('#year').textContent = new Date().getFullYear();

  renderStats(profile.stats);
  renderSkills(profile.skills);
  renderEducation(profile.education);
  renderResearch(profile.research);
  renderProjects(profile.projects);
  renderAchievements(profile.achievements);
  renderContact(profile.contact);
};

renderProfile().catch((error) => {
  document.body.classList.add('load-error');
  console.error('Profile data failed to load:', error);
});
