export function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#F5F5F0" }} role="contentinfo">
      <div className="max-content px-6">
        {/* Thin horizontal divider */}
        <div className="mb-8 mx-auto max-w-xs">
          <div className="h-px" style={{ backgroundColor: "rgba(45, 41, 38, 0.1)" }} />
        </div>

        {/* Centered minimal text */}
        <div className="text-center">
          <p 
            className="font-serif text-lg italic mb-2"
            style={{ color: "rgba(45, 41, 38, 0.6)" }}
          >
            Laurens & Monica
          </p>
          <p 
            className="text-[10px] uppercase font-bold"
            style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.3)" }}
          >
            2026
          </p>
        </div>
      </div>
    </footer>
  );
}
