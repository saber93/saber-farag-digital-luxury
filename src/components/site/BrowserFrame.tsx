import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  title?: string;
  url?: string;
  accentHsl?: string;
  className?: string;
  children: React.ReactNode;
};

export function BrowserFrame({ title, url, accentHsl, className, children }: Props) {
  const accent = accentHsl ? `hsl(${accentHsl})` : "var(--primary-glow)";

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[var(--shadow-elevated)]",
        className,
      )}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow behind frame */}
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-xl opacity-40 blur-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}, transparent 70%)` }}
      />

      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        {url && (
          <div className="flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-center text-[11px] text-muted-foreground">
            {url}
          </div>
        )}
        {title && !url && (
          <span className="flex-1 text-center text-[11px] text-muted-foreground">{title}</span>
        )}
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
