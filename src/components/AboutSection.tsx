import { motion } from "framer-motion";

const credentials = [
  {
    icon: "🎓",
    color: "bg-emerald-50",
    title: "Master's in Digital Transformation & Innovation",
    sub: "University of Michigan",
    badge: In Progress,
  },
  {
    icon: "📊",
    color: "bg-amber-50",
    title: "MBA in Analytics",
    sub: "Carleton University",
    badge: null,
  },
  {
    icon: "🤖",
    color: "bg-purple-50",
    title: "AI Engineer Certification",
    sub: "In progress",
    badge: "Currently studying",
  },
  {
    icon: "🏛️",
    color: "bg-blue-50",
    title: "Adjunct Professor",
    sub: "Lambton College",
    badge: null,
  },
  {
    icon: "📝",
    color: "bg-emerald-50",
    title: "Published — AI Governance Frameworks",
    sub: "Research & industry application",
    badge: null,
  },
];

const stats = [
  { number: "10+", desc: "Years of experience" },
  { number: "2", desc: "Continents of impact" },
  { number: "3", desc: "Advanced credentials" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary font-sans text-sm tracking-[0.3em] uppercase">About</span>

          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.1] mt-4 mb-4 text-foreground">
            Data Engineer.<br />
            <em className="not-italic text-muted-foreground">AI Practitioner.</em><br />
            Educator.
          </h2>

          <div className="w-12 h-0.5 bg-border mb-10" />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            {/* Bio */}
            <div>
              <div className="space-y-5 font-sans text-muted-foreground text-[15.5px] leading-[1.9] font-light">
                <p>
                  <strong className="text-foreground font-medium">I am a Data Engineer and AI Practitioner</strong> with over 10 years of experience
                  transforming complex datasets into strategic, business-defining insights. My career spans major
                  across Africa and North America, giving me a rare, cross-continental
                  perspective on how data infrastructure and intelligent systems operate at scale.
                </p>
                <p>
                  Armed with an <strong className="text-foreground font-medium">MBA in Analytics</strong> and a{" "}
                  <strong className="text-foreground font-medium">Master's in Digital Transformation and Innovation</strong>, I sit at the
                  intersection of rigorous academic research and real-world industry impact. Currently deepening my
                  technical edge through an{" "}
                  <strong className="text-foreground font-medium">AI Engineer certification</strong>, I remain committed
                  to staying at the frontier of what's possible — not just in theory, but in practice.
                </p>
                <p>
                  As an <strong className="text-foreground font-medium">Adjunct Professor at Lambton College</strong>, I translate that
                  intersection into the classroom, preparing the next generation of data professionals to think
                  critically and build responsibly.
                </p>
                <p>
                  My published work on{" "}
                  <strong className="text-foreground font-medium">AI governance frameworks</strong> reflects a conviction
                  that the most powerful systems are also the most principled ones. I don't just build AI. I build AI
                  that organizations can trust, scale, and defend.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-border">
                {stats.map((s) => (
                  <div key={s.desc} className="flex-1">
                    <div className="font-serif text-4xl font-bold text-foreground leading-none mb-1">{s.number}</div>
                    <div className="font-sans text-[11.5px] text-muted-foreground tracking-wide">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-4 font-medium">
                Credentials &amp; Roles
              </p>
              <div className="space-y-2.5">
                {credentials.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[15px] ${c.color}`}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-sans text-[13px] font-medium text-foreground leading-snug">{c.title}</p>
                      <p className="font-sans text-[11.5px] text-muted-foreground mt-0.5">{c.sub}</p>
                      {c.badge && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {c.badge}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
