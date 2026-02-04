/* ============================================================
   ASPIRANTIS — JavaScript
   Handles: scroll animations, navbar behavior,
   and mobile menu.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ----
     Adds a solid background and shadow when the user scrolls down. */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ---- Mobile hamburger menu ----
     Toggles the mobile navigation links on/off. */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  /* ---- Scroll animations ----
     Uses IntersectionObserver to trigger fade-in animations
     when elements enter the viewport. */
  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);

            setTimeout(() => {
              el.classList.add('animate-in');
            }, delay);

            // Stop observing once animated
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('animate-in'));
  }


  /* ---- Smooth scroll for anchor links ----
     Handles smooth scrolling for all internal anchor links,
     accounting for the fixed navbar height. */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });


  /* ---- Active nav link highlighting ----
     Highlights the nav link corresponding to the
     section currently visible in the viewport. */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          link.style.color = 'var(--color-primary)';
          link.style.fontWeight = '600';
        } else {
          link.style.color = '';
          link.style.fontWeight = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();
});
