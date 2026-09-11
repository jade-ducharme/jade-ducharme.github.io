module.exports = {
  siteTitle: 'Jade Ducharme',
  fullName: 'Jade Marie Ducharme',
  siteRole: 'Ph.D. candidate in physics at Brown University',
  siteDescription:
    'Jade Ducharme (Jade Marie Ducharme) is a Ph.D. candidate in physics at Brown University researching radio interferometry, 21-cm cosmology, and radio frequency interference mitigation with the Murchison Widefield Array. Publications, talks, and CV.',
  siteKeywords:
    'Jade Ducharme, Jade Marie Ducharme, Ducharme physics, Ducharme Brown University, Ducharme radio astronomy, radio astronomy, 21-cm cosmology, Epoch of Reionization, radio frequency interference, RFI mitigation, radio interferometry, MWA, Murchison Widefield Array, Brown University physics, Jonathan Pober, Bayesian modeling, astrophysics, astronomer',
  siteUrl: 'https://jade-ducharme.github.io/',
  siteLanguage: 'en_US',
  name: 'Jade Ducharme',
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
      url: '/#talks',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#00ea96',
    navy: '#1b1c1e',
    darkNavy: '#111213',
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
