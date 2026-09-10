module.exports = {
  siteTitle: 'Jade Marie Ducharme',
  siteDescription:
    'Jade Marie Ducharme is a Ph.D. candidate in physics at Brown University working on radio interferometry, 21-cm cosmology, and radio frequency interference mitigation.',
  siteKeywords:
    'Jade Ducharme, Jade Marie Ducharme, radio astronomy, 21-cm cosmology, Epoch of Reionization, radio frequency interference, RFI mitigation, radio interferometry, MWA, Murchison Widefield Array, Brown University, Bayesian modeling, astrophysics',
  siteUrl: 'https://jade-ducharme.github.io/',
  siteLanguage: 'en_US',
  name: 'Jade Marie Ducharme',
  location: 'Providence, RI',
  email: 'jade_ducharme@brown.edu',
  github: 'https://github.com/jade-ducharme',
  cv: '/cv.pdf',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/jade-ducharme',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/jade-ducharme',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Research',
      url: '/#jobs',
    },
    {
      name: 'Publications',
      url: '/#projects',
    },
    {
      name: 'Talks',
      url: '/archive',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
