const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const sectionAnimationConfig = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    margin: "100px 0px 100px 0px",
  },
  variants: sectionVariants,
  transition: {
    duration: 1.5,
    ease: "easeInOut",
  },
};
