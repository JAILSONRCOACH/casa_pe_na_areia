const ready = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

ready(() => {
  const body = document.body;
  const pageKey = body.dataset.page;
  const sidebar = document.getElementById('sidebar');
  const menuTrigger = document.querySelector('[data-menu-trigger]');
  const menuClose = document.querySelector('[data-menu-close]');
  const navLinks = document.querySelectorAll('.nav-links a[data-page]');
  const header = document.querySelector('.top-header');
  const hero = document.querySelector('.hero');

  const toggleMenu = (shouldOpen) => {
    if (!sidebar) return;
    sidebar.classList.toggle('active', shouldOpen);
    body.classList.toggle('menu-open', shouldOpen);
  };

  if (menuTrigger) {
    menuTrigger.addEventListener('click', () => toggleMenu(true));
  }

  if (menuClose) {
    menuClose.addEventListener('click', () => toggleMenu(false));
  }

  navLinks.forEach((link) => {
    if (link.dataset.page === pageKey) {
      link.classList.add('active');
    }

    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('click', (event) => {
    if (!sidebar || !sidebar.classList.contains('active')) {
      return;
    }

    if (sidebar.contains(event.target)) {
      return;
    }

    if (menuTrigger && menuTrigger.contains(event.target)) {
      return;
    }

    toggleMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  });

  const handleScroll = () => {
    if (header) {
      const scrolled = window.scrollY > 20;
      header.classList.toggle('is-scrolled', scrolled);
    }

    if (hero) {
      const offset = window.scrollY * 0.5;
      hero.style.backgroundPositionY = `${offset}px`;
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);
});
