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
      <h2 
        className="font-serif text-3xl md:text-4xl mb-4"
        style={{ color: "#1A1A1A", fontWeight: 400 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(26, 26, 26, 0.6)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
