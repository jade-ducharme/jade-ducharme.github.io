export const throttle = (func, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * Year from a frontmatter date. Reads the ISO string directly instead of
 * `new Date(...).getFullYear()`, which renders "2026-01-01" as 2025 in every
 * timezone behind UTC.
 */
export const yearOf = date => String(date).slice(0, 4);
