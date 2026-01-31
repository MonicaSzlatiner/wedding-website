import Link from "next/link";
import { weddingConfig } from "@/config/content";

export function Footer() {
  const { couple, date, navigation } = weddingConfig;

  return (
    <footer className="py-16 md:py-20" style={{ backgroundColor: "#6B705C" }} role="contentinfo">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Couple Names & Date */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-2" style={{ fontWeight: 400 }}>{couple.names}</h3>
            <p className="text-white/50 font-sans text-sm uppercase" style={{ letterSpacing: "0.15em" }}>{date.full}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-xs font-sans font-medium uppercase mb-4 text-white/50" 
              style={{ letterSpacing: "0.2em" }}
            >
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2 font-sans" aria-label="Footer navigation">
              {navigation.items.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/60 hover:text-white transition-all duration-200 text-sm uppercase"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Note */}
          <div>
            <h4 
              className="text-xs font-sans font-medium uppercase mb-4 text-white/50" 
              style={{ letterSpacing: "0.2em" }}
            >
              Questions?
            </h4>
            <p className="text-white/60 font-sans text-sm">
              Reach out to us directly if you have any questions about the celebration.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/40 text-xs font-sans uppercase" style={{ letterSpacing: "0.15em" }}>
            Made with love for our favorite people
          </p>
        </div>
      </div>
    </footer>
  );
}
