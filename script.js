
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.route-card');
const progressBar = document.querySelector('.page-progress span');
const topbar = document.querySelector('.topbar');
const transitionLayer = document.querySelector('.section-transition');
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const current = max > 0 ? (window.scrollY / max) * 100 : 0;
  if(progressBar) progressBar.style.width = `${current}%`;
  if(topbar) topbar.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

if(menuToggle && nav){
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if(!target) return;
    event.preventDefault();
    if(nav) nav.classList.remove('open');
    if(menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if(transitionLayer){
      transitionLayer.classList.remove('active');
      void transitionLayer.offsetWidth;
      transitionLayer.classList.add('active');
    }
    setTimeout(() => target.scrollIntoView({behavior:'smooth', block:'start'}), 170);
  });
});

const revealItems = document.querySelectorAll('.reveal, .section-head, .feature-grid article, .level-card, .route-card, .prep-card, .steps div, .review-grid blockquote, .request-grid > *, .faq-list details, .seo-grid > div');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.14, rootMargin:'0px 0px -40px 0px'});
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
  revealObserver.observe(item);
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {threshold:0.35});
sections.forEach(section => activeObserver.observe(section));

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      const visible = f === 'all' || card.dataset.level === f;
      card.classList.toggle('hidden', !visible);
      if(visible){
        card.classList.remove('filter-show');
        void card.offsetWidth;
        card.classList.add('filter-show');
      }
    });
  });
});

document.querySelectorAll('.gear-grid label').forEach(label => {
  const input = label.querySelector('input[type="checkbox"]');
  if(!input) return;
  input.addEventListener('change', () => label.classList.toggle('checked', input.checked));
});

function handleForm(event){
  event.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Заявка сохранена в демо-режиме. Для реального сайта подключите отправку в WhatsApp, Telegram, email или CRM.';
  note.style.color = '#1f5e45';
  event.target.reset();
  document.querySelectorAll('.gear-grid label.checked').forEach(label => label.classList.remove('checked'));
  return false;
}
