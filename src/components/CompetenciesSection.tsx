import { motion } from "framer-motion";
import { Brain, Shield, Database, BarChart3 } from "lucide-react";

const competencies = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description: "Building predictive models, NLP pipelines, and RAG systems with Python, TensorFlow, and HuggingFace.",
    tags: ["Python", "TensorFlow", "NLP", "LLMs"],
  },
  {
    icon: Shield,
    title: "AI Governance",
    description: "Published researcher on responsible AI frameworks. Bridging technical implementation with ethical oversight.",
    tags: ["Ethics", "Policy", "JERR Published"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Designing robust data pipelines and analytics infrastructure across banking and enterprise systems.",
    tags: ["SQL", "ETL", "Microsoft Fabric"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Visualization",
    description: "Transforming raw data into executive-ready dashboards and actionable business intelligence.",
    tags: ["Power BI", "Tableau", "Reporting"],
  },
];

const CompetenciesSection = () => {
  return (
    <section id="competencies" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-sans text-sm tracking-[0.3em] uppercase">Expertise</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Core Competencies
          </h2>
          <div className="w-16 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {competencies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-5">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full"
                    >
                      {tag}
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

export default CompetenciesSection;
