export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-silver/40" />
      <span className="micro-label">{children}</span>
    </div>
  );
}
