import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Activity } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { MiniArea, MiniBars } from "./MiniChart";

export function FloatingDashboards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* KPI tile top-right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[6%] top-[14%] w-[260px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard strong className="p-5 shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <span className="micro-label">Conversion</span>
              <ArrowUpRight className="h-4 w-4 text-primary-glow" />
            </div>
            <div className="mt-3 font-display text-4xl text-gradient">8.42%</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-300/80">
              <TrendingUp className="h-3 w-3" /> +24.6% vs last period
            </div>
            <div className="mt-3 -mx-1">
              <MiniArea height={56} />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Bars card bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[4%] bottom-[18%] w-[280px]"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <GlassCard strong className="p-5 shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <div>
                <span className="micro-label">Campaign ROAS</span>
                <div className="mt-2 font-display text-3xl">4.7×</div>
              </div>
              <Activity className="h-4 w-4 text-silver" />
            </div>
            <div className="mt-3 -mx-1">
              <MiniBars height={70} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Tiny ring stat right-bottom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute right-[12%] bottom-[14%] w-[180px]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <GlassCard strong className="p-4">
            <span className="micro-label">Sessions</span>
            <div className="mt-2 font-display text-2xl text-gradient-primary">128.4k</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-primary-glow" />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
