"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

interface Category {
  title: string;
  image: string;
  alt: string;
}

const categories: Category[] = [
  {
    title: "GERMAN PRECISION",
    image: "/hero-1.png",
    alt: "Mercedes-Benz luxury performance"
  },
  {
    title: "JDM LEGENDS",
    image: "/hero-2.png",
    alt: "Japanese drift culture"
  },
  {
    title: "LUXURY EDGE",
    image: "/split-1-left.png",
    alt: "Premium automotive design"
  },
  {
    title: "SUPERCAR ELITE",
    image: "/split-1-right.png",
    alt: "Hypercar performance"
  }
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Cursor state with smooth motion
  const cursor = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };
  
  // Image follows cursor with more dramatic spring effect
  const image = {
    x: useSpring(cursor.x, { stiffness: 35, damping: 15, mass: 1 }),
    y: useSpring(cursor.y, { stiffness: 35, damping: 15, mass: 1 })
  };

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      cursor.x.set(clientX);
      cursor.y.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;
  
  return (
    <motion.div 
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-zinc-800/30 to-black opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>
      
      {/* Animated cursor with trail effect */}
      <motion.div
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          pointerEvents: 'none',
          x: cursor.x,
          y: cursor.y,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div 
          className="rounded-full bg-white mix-blend-difference"
          animate={{
            width: activeIndex !== null ? '60px' : '20px',
            height: activeIndex !== null ? '60px' : '20px',
            scale: activeIndex !== null ? 1.2 : 1
          }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        />
      </motion.div>

      {/* Main content layout */}
      <div className="relative w-full h-full max-w-[2000px] mx-auto">
        {/* Split title treatment */}
        <div className="absolute inset-x-0 top-[15vh] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="relative"
          >
            <motion.h1 
              className={cn(
                "text-[clamp(5rem,20vw,16rem)] font-bold text-white leading-none tracking-tighter text-center",
                playfair.className
              )}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              AUTO
            </motion.h1>
            <motion.h1 
              className={cn(
                "text-[clamp(5rem,20vw,16rem)] font-bold text-white/80 leading-none tracking-tighter text-center -mt-8",
                playfair.className
              )}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              MUSE
            </motion.h1>
          </motion.div>
        </div>

        {/* Scattered categories with enhanced positioning */}
        <div className="absolute inset-0 flex items-center justify-center">
          {categories.map((category, index) => {
            // More dramatic positioning for each category
            const positions = [
              'top-[40%] right-[10%]',
              'top-[30%] left-[10%]',
              'bottom-[35%] right-[15%]',
              'bottom-[25%] left-[15%]'
            ];

            return (
              <motion.div
                key={category.title}
                className={cn(
                  "absolute",
                  positions[index]
                )}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1,
                  delay: 1 + (index * 0.2),
                  ease: [0.25, 0.1, 0, 1]
                }}
              >
                <motion.div
                  className="relative group"
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                >
                  <motion.p
                    className={cn(
                      "text-3xl md:text-5xl text-white/40 tracking-[0.2em] uppercase",
                      playfair.className,
                      activeIndex === index && "text-white"
                    )}
                    style={{
                      filter: activeIndex !== null && activeIndex !== index ? "blur(3px)" : "none",
                      opacity: activeIndex !== null && activeIndex !== index ? 0.15 : 1,
                    }}
                    whileHover={{ scale: 1.1, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {category.title}
                  </motion.p>
                  <motion.div 
                    className="absolute left-0 h-[2px] bg-white/40 -bottom-3"
                    initial={{ width: 0 }}
                    animate={{ width: activeIndex === index ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced floating image on hover */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 50,
                pointerEvents: 'none',
                x: image.x,
                y: image.y,
                translateX: '-50%',
                translateY: '-50%'
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: 5 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{
                  width: '600px',
                  height: '400px',
                  transformOrigin: 'center center'
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={categories[activeIndex].image}
                  alt={categories[activeIndex].alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore text with fade up animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className={cn(
            "absolute bottom-12 right-12 text-sm text-white/30 tracking-[0.3em] uppercase",
            playfair.className
          )}
        >
          Hover to explore
        </motion.p>
      </div>
    </motion.div>
  );
}