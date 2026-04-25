import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-navy-deep/50">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-primary font-sans text-sm tracking-[0.3em] uppercase">Connect</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
            Let's Collaborate
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
          <p className="font-sans text-muted-foreground leading-relaxed mb-10">
            Whether it is a Data Science challenge, AI governance Consultation, Digital Transformation or Academic collaboration,  I would love to hear from you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:connect@thesaheedat.com"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-sans font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <a
              href="https://www.linkedin.com/in/saheedat-abbas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-border text-foreground px-8 py-3.5 rounded-md font-sans font-medium text-sm hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
