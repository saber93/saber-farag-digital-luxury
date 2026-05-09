import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  accentHsl?: string;
  className?: string;
  children: React.ReactNode;
};

export function DeviceFrame({ accentHsl, className, children }: Props) {
  const accent = accentHsl ? `hsl(${accentHsl})` : "var(--primary-glow)";

  return (
    <motion.div
      className={cn("relative mx-auto w-[280px]", className)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] opacity-30 blur-3xl"
        style={{ background: accent }}
      />

      {/* Phone shell */}
      <div className="overflow-hidden rounded-[2.2rem] border-[3px] border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 shadow-[var(--shadow-elevated)]">
        {/* Notch */}
        <div className="relative mx-auto mb-1 h-5 w-28 rounded-b-xl bg-black/60" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[1.7rem] bg-black/40">
          {children}
        </div>

        {/* Home indicator */}
        <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/10" />
      </div>
    </motion.div>
  );
}
