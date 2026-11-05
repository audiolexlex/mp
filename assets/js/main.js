(function () {
  'use strict';

  // Scroll reveal animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
  }

  // Footer year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Back to top
  const btt = document.querySelector('.back-to-top');

  if (btt) {
    window.addEventListener(
      'scroll',
      () => {
        btt.classList.toggle('show', window.scrollY > 400);
      },
      { passive: true }
    );

    btt.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');

      if (id === '#') return;

      const target = document.querySelector(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero slideshow
  const heroImgs = document.querySelectorAll('.hero-bg img');

  if (heroImgs.length > 1) {
    let i = 0;

    setInterval(() => {
      heroImgs[i].classList.remove('active');
      i = (i + 1) % heroImgs.length;
      heroImgs[i].classList.add('active');
    }, 6000);
  }

  // Contact form
  const form = document.querySelector('[data-form]');

  if (form) {
    const ok = form.querySelector('.form-ok');
    const err = form.querySelector('.form-err');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      form.querySelectorAll('[required]').forEach((el) => {
        if (!el.value.trim()) valid = false;
      });

      if (ok) ok.classList.remove('show');
      if (err) err.classList.remove('show');

      if (valid) {
        if (ok) ok.classList.add('show');
        form.reset();
      } else {
        if (err) err.classList.add('show');
      }
    });
  }

  // Respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
  }
})();