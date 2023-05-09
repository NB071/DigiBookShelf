const slideVariant = {
  in: { x: 0, opacity: 1 },
  out: { x: "-100%", opacity: 0 },
  initial: { x: "-100%", opacity: 0 },
};
const pageVariant = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

module.exports = {
  slideVariant,
  pageVariant,
};
