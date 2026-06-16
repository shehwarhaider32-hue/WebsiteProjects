/* =========================================================
   Alex Carter — Freelance Portfolio
   Interactions: theme, mobile nav, scroll reveal, counters,
   project filters, active nav, form validation, back-to-top
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Theme toggle (persisted) ---------- */
  const themeToggle = $('#themeToggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- Mobile navigation ---------- */
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');

  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  $$('#navLinks a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Sticky header shadow ---------- */
  const header = $('#header');
  const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 10);
    toTop?.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = $$('.stat-num');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Project filters ---------- */
  const filters = $$('.filter');
  const projects = $$('.project');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projects.forEach((p) => {
        const match = cat === 'all' || p.dataset.category === cat;
        p.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$('main section[id]');
  const navAnchors = $$('#navLinks a');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach((a) =>
              a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => so.observe(s));
  }

  /* ---------- Contact form validation ---------- */
  const form = $('#contactForm');
  const success = $('#formSuccess');

  const setError = (field, msg) => {
    const input = $(`#${field}`);
    const errEl = $(`.error[data-for="${field}"]`);
    if (errEl) errEl.textContent = msg;
    if (input) input.classList.toggle('invalid', Boolean(msg));
    return !msg;
  };

  const validators = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'),
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(validators).forEach((field) => {
      const value = form.elements[field]?.value || '';
      const msg = validators[field](value);
      if (!setError(field, msg)) valid = false;
    });

    if (valid) {
      // No backend wired up — simulate a successful submission.
      form.reset();
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 6000);
    }
  });

  // Clear errors as the user fixes fields
  ['name', 'email', 'message'].forEach((field) => {
    form?.elements[field]?.addEventListener('input', (e) => {
      const msg = validators[field](e.target.value);
      setError(field, msg);
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
