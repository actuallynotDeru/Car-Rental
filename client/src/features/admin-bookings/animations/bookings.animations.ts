import { easeIn, easeOut, spring } from "framer-motion"

export const BookingsAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transparent: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  
  header: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeIn,
      }
    }
  },
  
  filterCard: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeIn,
      }
    }
  },
  
  table: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeIn,
      }
    }
  },
  
  tableRow: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }
}