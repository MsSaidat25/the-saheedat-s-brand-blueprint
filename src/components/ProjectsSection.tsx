import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Fraud Detection",
    category: "Machine Learning",
    description: "Developed ML models for real-time fraud detection in banking transactions, reducing false positives by 35%.",
    tech: ["Python", "Scikit-learn", "SQL"],
  },
  {
    title: "RAG Knowledge System",
    category: "LLM / NLP",
    description: "Built a retrieval-augmented generation system for enterprise document Q&A with contextual accuracy.",
    tech: ["LangChain", "Vector DB", "GPT-4"],
  },
  {
    title: "AI Governance Framework",
    category: "Research & Policy",
    description: "Published research paper on AI governance frameworks in the Journal of Engineering Research and Reports.",
    tech: ["Research", "Policy Design", "Ethics"],
  },
  {
    title: "Sentiment Analysis Pipeline",
    category: "NLP",
    description: "HuggingFace-based sentiment analysis system processing customer feedback at scale for actionable insights.",
    tech: ["HuggingFace", "Transformers", "Python"],
  },
  {
    title: "IDÁN AI Platform",
    category: "Full-Stack AI",
    description: "Co-developed an AI-driven analytics platform for data-informed decision making across organizations.",
    tech: ["Python", "ML", "Dashboard"],
  },
  {
    title: "Power BI Optimization",
    category: "Analytics",
    description: "Redesigned enterprise reporting dashboards, cutting report generation time by 60% with optimized queries.",
    tech: ["Power BI", "DAX", "SQL"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-navy-deep/50">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-sans text-sm tracking-[0.3em] uppercase">Portfolio</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Featured Projects
          </h2>
          <div className="w-16 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
              <div className="p-7">
                <span className="text-xs font-sans font-medium text-primary tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-sans font-medium text-muted-foreground border border-border px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
