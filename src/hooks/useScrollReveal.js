import { useEffect, useRef } from "react";

/**
 * useScrollReveal - A reusable hook for scroll-triggered reveal animations.
 *
 * Adds the class "revealed" to elements when they enter the viewport.
 * Pair with CSS classes: .scroll-reveal, .scroll-reveal-child
 *
 * @param {Object} options
 * @param {number} options.threshold - How much of the element must be visible (0-1). Default 0.15
 * @param {string} options.rootMargin - Margin around root. Default "0px 0px -50px 0px"
 * @param {boolean} options.once - Only trigger once. Default true
 */
const useScrollReveal = ({
  threshold = 0.08,
  rootMargin = "0px 0px -10px 0px",
  once = true,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      node.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove("revealed");
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, rootMargin, once]);

  return ref;
};

/**
 * useScrollRevealGroup - Observes a container and reveals its children with stagger.
 *
 * When the container enters the viewport, the class "revealed" is added to it,
 * which triggers staggered CSS transitions on children with .scroll-reveal-child.
 *
 * @param {Object} options
 * @param {number} options.threshold - Default 0.1
 * @param {string} options.rootMargin - Default "0px 0px -40px 0px"
 */
const useScrollRevealGroup = ({
  threshold = 0.05,
  rootMargin = "0px 0px -10px 0px",
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      node.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, rootMargin]);

  return ref;
};

export { useScrollReveal, useScrollRevealGroup };
export default useScrollReveal;
