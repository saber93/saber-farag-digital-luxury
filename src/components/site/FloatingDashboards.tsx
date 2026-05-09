import { motion } from "framer-motion";

export function FloatingDashboards() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-5 overflow-hidden">
      <div className="relative h-full w-full">
        {/* Widget 1: Revenue Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -50, rotate: 10 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-12 top-[15%] w-72 rounded-3xl border border-white/10 bg-surface/40 p-6 shadow-elevated backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="h-2 w-16 rounded-full bg-white/10" />
            <div className="h-4 w-4 rounded-full bg-primary/20" />
          </div>
          <div className="space-y-4">
             <div className="h-8 w-3/4 rounded-lg bg-gradient-to-r from-white/10 to-transparent" />
             <div className="flex items-end gap-1 h-24">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex-1 bg-primary/30 rounded-t-sm origin-bottom" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
             </div>
          </div>
        </motion.div>

        {/* Widget 2: Fleet Status */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100, rotate: -15 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-16 bottom-[20%] w-64 rounded-3xl border border-white/5 bg-surface/30 p-5 shadow-elevated backdrop-blur-xl"
        >
          <div className="flex gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-white/5" />
             <div className="flex-1 space-y-2">
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-2/3 bg-white/5 rounded" />
             </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
             <div className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Live Telemetry</div>
             <div className="text-2xl font-display italic">98.4%</div>
          </div>
        </motion.div>

        {/* Widget 3: Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[15%] top-[-5%] w-56 rounded-2xl border border-white/5 bg-surface/20 p-4 shadow-elevated backdrop-blur-lg hidden lg:block"
        >
           <div className="space-y-3">
              <div className="h-1.5 w-1/2 bg-white/10 rounded" />
              <div className="space-y-1.5">
                 <div className="h-6 w-full bg-primary/10 rounded-lg border border-primary/10" />
                 <div className="h-6 w-[80%] bg-white/5 rounded-lg" />
                 <div className="h-6 w-[60%] bg-white/5 rounded-lg" />
              </div>
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
