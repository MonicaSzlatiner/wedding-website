interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-serif text-display-sm md:text-display-md text-stone-800 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
