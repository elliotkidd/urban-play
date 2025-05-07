const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const customEase = [0.53, 0.01, 0.42, 1];

const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };
const transition = { duration: 0.5, ease: customEase };

export const titleVariants = {
  hidden,
  visible: {
    ...visible,
    transition: { ...transition, delay: 0.25 },
  },
};

export const descriptionVariants = {
  hidden,
  visible: {
    ...visible,
    transition: { ...transition, delay: 0.5 },
  },
};

export const sectionAnimationConfig = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    margin: "-100px 0px -100px 0px",
  },
  variants: sectionVariants,
  transition: {
    duration: 1.5,
    ease: "easeInOut",
  },
};
