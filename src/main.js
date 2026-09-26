const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileNav.hidden = isOpen;
  menuButton.textContent = isOpen ? 'Menu' : 'Close';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  });
});

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const heroImage = document.querySelector('.hero-image img');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heroImage) {
  let heroFrame = 0;

  const updateHeroParallax = () => {
    if (prefersReducedMotion.matches) {
      heroImage.style.setProperty('--hero-parallax-offset', '0px');
      return;
    }

    if (heroFrame) return;

    heroFrame = window.requestAnimationFrame(() => {
      const imageBounds = heroImage.getBoundingClientRect();
      const centerOffset = window.innerHeight / 2 - (imageBounds.top + imageBounds.height / 2);
      const parallaxOffset = Math.max(-20, Math.min(20, centerOffset * 0.12));
      heroImage.style.setProperty('--hero-parallax-offset', `${parallaxOffset.toFixed(1)}px`);
      heroFrame = 0;
    });
  };

  window.addEventListener('scroll', updateHeroParallax, { passive: true });
  window.addEventListener('resize', updateHeroParallax, { passive: true });
  prefersReducedMotion.addEventListener?.('change', updateHeroParallax);
  updateHeroParallax();
}

const certificateViewer = document.querySelector('.certificate-viewer');

if (certificateViewer) {
  const viewerImage = certificateViewer.querySelector('.certificate-viewer-image');
  const viewerTitle = certificateViewer.querySelector('.certificate-viewer-title');

  document.querySelectorAll('.certificate').forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      viewerImage.src = card.href;
      viewerImage.alt = card.querySelector('img').alt;
      viewerTitle.textContent = card.querySelector('.certificate-title').textContent;

      if (typeof certificateViewer.showModal === 'function') {
        certificateViewer.showModal();
      } else {
        window.location.href = card.href;
      }
    });
  });

  certificateViewer.addEventListener('cancel', (event) => {
    event.preventDefault();
    certificateViewer.close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificateViewer.open) {
      event.preventDefault();
      certificateViewer.close();
    }
  });

  certificateViewer.addEventListener('click', (event) => {
    if (event.target === certificateViewer) certificateViewer.close();
  });
}
