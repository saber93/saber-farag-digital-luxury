import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps, useMotionValue, useTransform } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { strong?: boolean; children?: React.ReactNode };

export function GlassCard({ className, strong, children, ...rest }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`,
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn(
        strong ? "glass-strong" : "glass",
        "relative overflow-hidden rounded-2xl group",
        className,
      )}
      {...rest}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
