# WebsiteProjects

A modern, fully responsive **freelancer portfolio website** built with plain
HTML, CSS, and JavaScript — no build step or dependencies required.

## ✨ Features

- **Responsive design** — looks great from mobile (320px) to large desktops
- **Light / dark mode** — toggle with persistence via `localStorage`, respects
  system preference
- **Animated hero** with code-card mockup, floating badges, and a tech marquee
- **Scroll-reveal animations** powered by `IntersectionObserver`
- **Animated stat counters** that count up when scrolled into view
- **Filterable project gallery** (All / Web Apps / Landing Pages / E-commerce)
- **Sticky navbar** with scroll spy (active link highlighting) and a mobile
  hamburger menu
- **Contact form** with client-side validation and a success state
- **Accessibility** — skip link, focus styles, ARIA attributes, and reduced-motion
  support
- **Back-to-top** button

## 📁 Structure

```
.
├── index.html      # Page markup (hero, about, services, work, testimonials, contact)
├── css/
│   └── styles.css  # All styling + responsive breakpoints + theming tokens
├── js/
│   └── script.js   # Theme, nav, reveal, counters, filters, form validation
└── README.md
```

## 🚀 Usage

Just open `index.html` in any modern browser. To serve locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`.

## 🎨 Customizing

- **Colors / theme:** edit the CSS variables in `:root` and `[data-theme="dark"]`
  at the top of `css/styles.css`.
- **Content:** all copy, projects, and testimonials live directly in
  `index.html` — search for the relevant section comment (e.g. `<!-- Work -->`).
- **Contact form:** the form is front-end only. Wire `#contactForm`'s submit
  handler in `js/script.js` to your backend or a service like Formspree.
