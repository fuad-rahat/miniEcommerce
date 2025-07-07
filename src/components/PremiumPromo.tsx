import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PremiumPromo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      ref={containerRef}
      className="h-[28rem] md:min-h-screen bg-gradient-to-br from-emerald-200 to-emerald-400 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background tear effect */}
      <motion.div
        className="absolute inset-0 bg-emerald-800"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        animate={
          isVisible
            ? {
                clipPath: "polygon(0 0, 45% 0, 55% 100%, 0% 100%)",
              }
            : {}
        }
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-2xl w-full mx-auto px-4">
        <div className="relative top-32 aspect-square">
          {/* Decorative lines */}
          <motion.div
            className="absolute left-0 bottom-1/3 space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1 w-8 bg-white transform -rotate-45" style={{ marginLeft: i * 4 }} />
            ))}
          </motion.div>

          {/* Main circular container */}
          <motion.div
            className="relative w-3/5 aspect-square mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Circular image */}
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Premium Wireless Headphones"
                className="rounded-full w-full h-full object-cover"
              />
            </div>

            {/* Rotating text container */}
            <motion.div className="absolute inset-[-25%] z-10" style={{ rotate }}>
              {/* Top text */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="textPath" d="M50,10 A40,40 0 1,1 49.999,10" fill="none" stroke="none" />
                <motion.text
                  className="text-[8px] fill-white font-bold uppercase tracking-[0.3em]"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <textPath href="#textPath" startOffset="25%">
                    Experience Premium Sound. Shop Now!
                  </textPath>
                </motion.text>
              </svg>
            </motion.div>
          </motion.div>
        </div>
        {/* Bottom text */}
        <motion.div
          className=" relative pb-10 bottom-2 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl  md:text-3xl font-bold text-white drop-shadow-lg">
            Premium Wireless Headphones
          </h2>
          <p className="text-lg text-white/90 mt-2 max-w-xl mx-auto">
            High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 