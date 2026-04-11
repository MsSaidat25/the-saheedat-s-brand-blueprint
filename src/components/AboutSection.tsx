import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, Award } from "lucide-react";

const milestones = [
  { icon: Briefcase, label: "8+ Years", detail: "Data & Analytics Experience" },
  { icon: GraduationCap, label: "MS Student", detail: "University of Michigan" },
  { icon: BookOpen, label: "Published", detail: "AI Governance in JERR" },
  { icon: Award, label: "Professor", detail: "Adjunct at Lambton College" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-sans text-sm tracking-[0.3em] uppercase">About</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
              Saheedat Abbas
            </h2>
            <div className="w-16 h-0.5 bg-primary mb-8" />
            <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
              <p>
                I'm a Data Scientist and AI Practitioner with over 8 years of experience 
                transforming complex datasets into strategic insights. My career spans 
                major financial institutions including Scotiabank, CIBC, and NAV Canada.
              </p>
              <p>
                Currently pursuing my Master's at the University of Michigan while serving 
                as an Adjunct Professor at Lambton College, I bridge the gap between 
                cutting-edge AI research and practical industry application.
              </p>
              <p>
                My published work on AI governance frameworks reflects my commitment to 
                building AI systems that are not only powerful but responsible and ethical.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors"
                >
                  <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="font-serif text-lg font-bold text-foreground">{m.label}</div>
                  <div className="font-sans text-xs text-muted-foreground mt-1">{m.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
