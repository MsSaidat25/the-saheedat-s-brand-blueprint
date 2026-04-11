import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gold gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase mb-6">
              Data Scientist · AI Practitioner · Researcher
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8"
          >
            <span className="text-foreground">The</span>
            <br />
            <span className="text-primary animate-gold-shimmer">Saheedat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Turning complex data into clear decisions. 8+ years bridging analytics, 
            machine learning, and responsible AI — from banking fraud detection to 
            pioneering governance frameworks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-sans font-medium text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              View My Work
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-md font-sans font-medium text-sm tracking-wide hover:bg-secondary transition-colors"
            >
              About Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
