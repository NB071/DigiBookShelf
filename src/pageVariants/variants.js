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

// mobile menu bubble fade-in/out animation
const mobileMenuVariant = {
  initial: {
    opacity: 0,
    x: -300,
    scale: 0,
    borderRadius: "50%",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    borderRadius: "0%",
  },
  exit: {
    opacity: 0,
    x: -300,
    scale: 0,
    borderRadius: "50%",
  },
};

const loaderVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

module.exports = {
  slideVariant,
  pageVariant,
  mobileMenuVariant,
  loaderVariant,
};
