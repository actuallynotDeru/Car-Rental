import { easeInOut, easeOut } from "framer-motion"

export const MainAnimations = {
  // Hero section
  hero: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: easeOut,
      }
    }
  },

  // Hero image
  heroImage: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1.25,
      transition: {
        duration: 1.2,
        ease: easeOut,
      }
    }
  },

  // Header navigation
  headerNav: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      }
    }
  },

  // Hero text
  heroText: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.3
      }
    }
  },

  // Search box
  searchBox: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.5
      }
    }
  },

  // Section title
  sectionTitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      }
    }
  },

  // How it works section
  stepsContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },

  stepCard: {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      }
    }
  },

  stepCardHover: {
    rest: {
      y: 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    }
  },

  // Feature sections (Explore Cebu, Share the Drive)
  featureSection: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },

  featureImage: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      }
    }
  },

  featureText: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      }
    }
  },

  // Review cards
  reviewsContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  },

  reviewCard: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      }
    }
  },

  reviewCardHover: {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    }
  },

  // Buttons
  ctaButton: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.95 }
  },

  // Footer
  footer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
}