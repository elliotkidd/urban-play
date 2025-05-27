export const customEase = [0.53, 0.01, 0.42, 1];
export const STAGGER_DELAY = 0.3;

export const opacityOnlyVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const opacityOnlyConfig = {
  initial: "hidden",
  whileInView: "show",
  variants: opacityOnlyVariants,
  transition: {
    duration: 1.5,
    ease: "easeInOut",
  },
};

export const opacityStaggerChildrenConfig = {
  initial: "hidden",
  whileInView: "show",
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: STAGGER_DELAY },
    },
  },
};

export const childVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease: customEase },
  },
};

const hidden = { opacity: 0, y: 16 };
const show = { opacity: 1, y: 0 };
const transition = { duration: 0.5, ease: customEase };

export const titleVariants = (delay?: number) => ({
  hidden,
  show: {
    ...show,
    transition: { ...transition, delay: delay ?? 0.25 },
  },
});

export const descriptionVariants = (delay?: number) => ({
  hidden,
  show: {
    opacity: 0.6,
    y: 0,
    transition: { ...transition, delay: delay ?? 0.5 },
  },
});

export const sectionAnimationConfig = {
  initial: "hidden",
  whileInView: "show",
  viewport: {
    margin: "-100px 0px -100px 0px",
  },
  variants: opacityOnlyVariants,
  transition: {
    duration: 1.5,
    ease: "easeInOut",
  },
};
