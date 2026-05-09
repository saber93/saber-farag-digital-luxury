import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, type Project } from "../lib/projects";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowLeft, 
  Target, 
  Zap, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Quote 
} from "lucide-react";
import { BrowserFrame } from "../components/site/BrowserFrame";
import { DeviceFrame } from "../components/site/DeviceFrame";
import { MagneticButton } from "../components/site/MagneticButton";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: progressSpring }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 md:p-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <Link 
            to="/work" 
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface/50 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Projects</span>
          </Link>
          
          {project.status === "live" && (
            <MagneticButton className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-glow">
              Launch Product
            </MagneticButton>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-6">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <img 
            src={project.image} 
            className="w-full h-full object-cover grayscale brightness-50"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">
              {project.category} · {project.year}
            </span>
            <h1 className="text-6xl md:text-9xl font-display italic leading-tight mb-8">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: heroOpacity }}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-64 pb-32">
        
        {/* Business Context Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 sticky top-32">
            <h2 className="text-4xl md:text-5xl font-display italic mb-8">The Business Context</h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">The Challenge</span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.businessContext?.problem || project.problem}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-accent">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">The Objective</span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.businessContext?.objective}
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 pt-12 md:pt-0">
             <div className="p-8 rounded-3xl bg-surface border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-primary/10 transition-colors">
                  <BarChart3 className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Market Insight</h3>
                <p className="text-xl text-muted-foreground font-light italic relative z-10">
                  "{project.businessContext?.marketInsight}"
                </p>
             </div>
          </div>
        </section>

        {/* Product Intelligence (Metrics) */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-display italic">Product Intelligence</h2>
            <p className="text-muted-foreground max-w-sm text-right">
              Data-driven validation of user behavior and business efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.metrics.map((metric: any, i: number) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                    {metric.label}
                  </span>
                  {metric.trend && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${metric.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {metric.trend === 'up' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-[10px] text-muted-foreground mb-6 uppercase tracking-wider">{metric.sub}</div>
                {metric.data && (
                  <div className="h-12 flex items-end gap-1">
                    {metric.data.map((v: number, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex-1 bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-sm"
                        style={{ height: `${(v / Math.max(...metric.data!)) * 100}%` }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cinematic Mockups */}
        <section className="space-y-32">
          {project.screens.map((screen: any, i: number) => (
            <div key={screen.title} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="flex-1 w-full">
                {screen.chart === 'kpi-grid' ? (
                  <DeviceFrame accentHsl={project.accentHsl}>
                    <div className="w-full h-full bg-surface flex flex-col p-6 gap-4">
                      <div className="h-4 w-1/2 bg-white/5 rounded" />
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="bg-white/5 rounded-2xl p-4 flex flex-col justify-end gap-2">
                           <div className="h-2 w-full bg-primary/20 rounded" />
                           <div className="h-6 w-2/3 bg-white/10 rounded" />
                        </div>
                        <div className="bg-white/5 rounded-2xl" />
                        <div className="bg-white/5 rounded-2xl" />
                        <div className="bg-primary/5 rounded-2xl border border-primary/10" />
                      </div>
                    </div>
                  </DeviceFrame>
                ) : (
                  <BrowserFrame accentHsl={project.accentHsl}>
                    <div className="w-full h-full bg-surface-elevated flex flex-col">
                      <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                      </div>
                      <div className="flex-1 p-8 flex flex-col gap-6">
                        <div className="h-8 w-1/3 bg-white/5 rounded-lg" />
                        <div className="grid grid-cols-3 gap-6 flex-1">
                          <div className="col-span-2 bg-white/5 rounded-2xl relative overflow-hidden">
                             {screen.chart === 'area' && (
                               <div className="absolute inset-0 flex items-end">
                                 <svg className="w-full h-1/2 opacity-20" preserveAspectRatio="none">
                                   <path d="M0 100 Q 25 20, 50 80 T 100 0 L 100 100 L 0 100 Z" fill="currentColor" className="text-primary" />
                                 </svg>
                               </div>
                             )}
                          </div>
                          <div className="bg-white/5 rounded-2xl" />
                        </div>
                      </div>
                    </div>
                  </BrowserFrame>
                )}
              </div>
              <div className="flex-1 space-y-6 max-w-md">
                <h3 className="text-3xl font-bold">{screen.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {screen.description}
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="px-4 py-2 rounded-full bg-surface border border-white/5 text-[10px] uppercase font-bold tracking-widest">
                    Component Level
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Design Decisions */}
        <section className="space-y-16">
          <h2 className="text-4xl md:text-5xl font-display italic text-center">Decision-Making Through Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {project.designDecisions?.map((decision: any, i: number) => (
              <div key={decision.title} className="space-y-6 p-10 rounded-[2rem] bg-surface-elevated border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{decision.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {decision.content}
                </p>
                <div className="pt-6 border-t border-white/5">
                   <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-2">Measured Impact</span>
                   <p className="text-lg font-medium">{decision.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Thinking */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-surface p-12 md:p-24 rounded-[3rem] border border-white/5">
          <div className="md:col-span-5 space-y-8">
            <h2 className="text-4xl md:text-5xl font-display italic leading-tight">System Thinking & Scalability</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every interface is part of a larger ecosystem. We focus on modularity, 
              performance, and developer-to-design synergy.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech: string) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Architecture", content: project.systemThinking?.architecture },
                { label: "Scalability", content: project.systemThinking?.scalability },
                { label: "Collaboration", content: project.systemThinking?.collaboration },
              ].map((item, i) => (
                <div key={item.label} className="p-6 rounded-2xl bg-background/50 border border-white/5 flex gap-6 items-start">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">{item.label}</h4>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="relative py-32 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white/5">
              <Quote className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <p className="text-3xl md:text-5xl font-display italic leading-snug">
                "{project.testimonial.quote}"
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent p-px">
                  <div className="w-full h-full rounded-full bg-surface-elevated flex items-center justify-center font-bold text-xl">
                    {project.testimonial.author[0]}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xl">{project.testimonial.author}</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-widest">{project.testimonial.role}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="text-center py-32">
          <h2 className="text-4xl md:text-6xl font-display italic mb-12">Experience Aura</h2>
          <div className="flex justify-center gap-6">
            <MagneticButton className="px-12 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-glow">
               Start Partnership
            </MagneticButton>
          </div>
        </section>

      </div>
    </div>
  );
}
