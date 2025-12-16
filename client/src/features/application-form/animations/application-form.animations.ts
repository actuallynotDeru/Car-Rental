import { easeOut, spring } from "framer-motion";

export const ApplicationFormAnimations = {
  // Hero section
  hero: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  },

  // Logo
  logo: {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  },

  // Content sections with stagger
  contentContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },

  // Left column content
  leftContent: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  },

  // Right column form
  formCard: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  },

  // Success state
  success: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 200,
        damping: 20
      }
    }
  },
}