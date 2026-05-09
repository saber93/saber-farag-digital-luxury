import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { strong?: boolean };

export function GlassCard({ className, strong, children, ...rest }: Props) {
  return (
    <motion.div
      className={cn(
        strong ? "glass-strong" : "glass",
        "relative overflow-hidden rounded-2xl",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
