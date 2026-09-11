import { hex2rgba } from '@utils';

// Neutral dark-grey backgrounds with a jade accent. The token names below are
// inherited from the template (navy / slate / green) and are kept as structural
// slots — darkest background, page background, raised surface, border, dim text,
// text, bright text, accent — so every component keeps working. The values are
// grey and jade, not navy.
const ACCENT = '#00ea96'; // jade — links, overlines, buttons, emphasis
const DARK_BG = '#111213'; // deepest grey
const BG = '#1b1c1e'; // page background

const theme = {
  colors: {
    darkNavy: DARK_BG,
    navy: BG,
    lightNavy: '#26282b', // raised surfaces: cards, tab hover, code
    lightestNavy: '#3b3e43', // borders and dividers
    slate: '#aeafb4', // default body text
    lightSlate: '#cbccd0', // brighter body text
    lightestSlate: '#e6e7ea', // headings
    white: '#fafafa', // brightest emphasis
    green: ACCENT,
    transGreen: hex2rgba(ACCENT, 0.07),
    shadowNavy: hex2rgba(DARK_BG, 0.7),
  },

  fonts: {
    Calibre:
      'Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif',
    SFMono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
  },

  fontSizes: {
    xs: '12px',
    smish: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h4: '26px',
    h3: '32px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '3px',
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: 120,
  radius: 3,

  hamburgerWidth: 30,
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

  navDelay: 100,
  fadeTimeout: 2000,
};

export default theme;
