const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion = window.anime;

const animate = (options) => {
  if (!motion || prefersReducedMotion) return;
  motion(options);
};

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    const shouldOpen = !isOpen;

    menuButton.setAttribute('aria-expanded', String(shouldOpen));
    mobileNav.hidden = !shouldOpen;
    menuButton.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');

    if (shouldOpen) {
      animate({
        targets: mobileNav,
        opacity: [0, 1],
        translateY: [-12, 0],
        duration: 360,
        easing: 'easeOutCubic'
      });
    }
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    });
  });
}

const serviceImageMap = {
  'carpentry.html': ['assets/project-01.jpg', 'Bespoke carpentry and interior project'],
  'kitchens.html': ['assets/gallery-04.jpg', 'Bespoke kitchen carpentry project'],
  'flooring.html': ['assets/project-02.jpg', 'Flooring and interior construction project'],
  'loft-conversions.html': ['assets/project-03.jpg', 'Loft structure and timber construction project'],
  'extensions.html': ['assets/project-04.jpg', 'Home extension construction project'],
  'renovations.html': ['assets/project-18.jpg', 'Home renovation and fitted interior project'],
  'new-builds.html': ['assets/gallery-07.jpg', 'New build timber construction project'],
  'roofing.html': ['assets/gallery-01.jpg', 'Cut and truss roofing construction project']
};

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const serviceImage = document.querySelector('.service-page-image img');
const matchedServiceImage = serviceImageMap[currentPage];

if (serviceImage && matchedServiceImage) {
  serviceImage.src = matchedServiceImage[0];
  serviceImage.alt = matchedServiceImage[1];
}

document.querySelectorAll('.reveal').forEach((item) => {
  item.classList.add('is-visible');
});

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

if (!prefersReducedMotion && motion) {
  const heroTitle = document.querySelector('.hero-copy h1');

  if (heroTitle) {
    heroTitle.setAttribute('aria-label', heroTitle.textContent);
    const textWalker = document.createTreeWalker(heroTitle, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();

      [...textNode.textContent].forEach((character) => {
        const characterSpan = document.createElement('span');
        characterSpan.className = 'typing-char';
        characterSpan.textContent = character;
        fragment.appendChild(characterSpan);
      });

      textNode.replaceWith(fragment);
    });
  }

  const heroBrand = document.querySelector('.hero-brand');

  if (heroBrand) {
    heroBrand.setAttribute('aria-label', heroBrand.textContent.trim());
    const brandText = heroBrand.textContent.trim();
    const brandFragment = document.createDocumentFragment();

    [...brandText].forEach((character) => {
      const characterSpan = document.createElement('span');
      characterSpan.className = 'typing-char';
      characterSpan.textContent = character === ' ' ? '\u00A0' : character;
      brandFragment.appendChild(characterSpan);
    });

    heroBrand.textContent = '';
    heroBrand.appendChild(brandFragment);
  }

  const heroTimeline = motion.timeline({ easing: 'easeOutExpo' });

  heroTimeline
    .add({ targets: '.site-header', opacity: [0, 1], translateY: [-32, 0], scale: [.98, 1], duration: 820 })
    .add({
      targets: '.hero-image',
      opacity: [0, 1],
      translateX: [140, 0],
      rotate: [2.5, 0],
      scale: [1.18, 1],
      clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
      duration: 1350,
      easing: 'easeInOutQuart'
    }, '-=520')
    .add({
      targets: '.hero-copy',
      opacity: [0, 1],
      translateY: [110, 0],
      scale: [.82, 1],
      duration: 1050,
      easing: 'easeOutExpo'
    }, '-=980')
    .add({
      targets: '.hero-brand',
      opacity: [0, 1],
      translateX: [60, 0],
      scale: [.96, 1],
      duration: 900,
      easing: 'easeOutExpo'
    }, '-=780')
    .add({
      targets: '.hero-copy h1',
      opacity: [0, 1],
      translateX: [-18, 0],
      duration: 320,
      easing: 'easeOutCubic'
    }, '-=560')
    .add({
      targets: '.typing-char',
      opacity: [0, 1],
      translateY: ['.35em', '0em'],
      delay: motion.stagger(78),
      duration: 420,
      easing: 'easeOutCubic'
    }, '-=140')
    .add({
      targets: '.hero-copy > p, .hero-actions',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: motion.stagger(120),
      duration: 650,
      easing: 'easeOutCubic'
    }, '-=520');

  motion.set('.domestic-commercial-card, .services-heading, .service-list a, .dark-cta, .quote, .contact-main, .contact-topline', {
    opacity: 0,
    translateY: 28
  });

  motion.timeline({ easing: 'easeOutCubic' })
    .add({
      targets: '.domestic-commercial-card',
      opacity: [0, 1],
      translateY: [28, 0],
      delay: motion.stagger(110),
      duration: 760
    }, 260)
    .add({
      targets: '.services-heading, .service-list a',
      opacity: [0, 1],
      translateY: [26, 0],
      delay: motion.stagger(90),
      duration: 720
    }, 380)
    .add({
      targets: '.dark-cta, .quote, .contact-main, .contact-topline',
      opacity: [0, 1],
      translateY: [26, 0],
      delay: motion.stagger(90),
      duration: 780
    }, 520);
}

if (motion && !prefersReducedMotion) {
  document.querySelectorAll('.service-list a, .project, .contact-method, .button').forEach((element) => {
    element.addEventListener('mouseenter', () => motion({ targets: element, scale: 1.025, duration: 240, easing: 'easeOutQuad' }));
    element.addEventListener('mouseleave', () => motion({ targets: element, scale: 1, duration: 320, easing: 'easeOutQuad' }));
  });

  document.querySelectorAll('.project').forEach((project) => {
    const image = project.querySelector('img');
    project.addEventListener('mouseenter', () => motion({ targets: image, scale: 1.06, translateX: -5, translateY: -3, duration: 700, easing: 'easeOutQuart' }));
    project.addEventListener('mouseleave', () => motion({ targets: image, scale: 1, translateX: 0, translateY: 0, duration: 850, easing: 'easeOutQuart' }));
  });
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
