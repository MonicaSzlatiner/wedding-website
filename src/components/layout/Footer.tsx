import Link from "next/link";
import { weddingConfig } from "@/config/content";

export function Footer() {
  const { couple, date, navigation } = weddingConfig;

  return (
    <footer className="bg-sage-600 text-white py-20" role="contentinfo">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Couple Names & Date */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-2" style={{ letterSpacing: "1px" }}>{couple.names}</h3>
            <p className="text-ivory">{date.full}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-normal tracking-wider uppercase mb-4 text-ivory" style={{ letterSpacing: "1.5px" }}>
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2" aria-label="Footer navigation">
              {navigation.items.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ivory hover:text-white transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Note */}
          <div>
            <h4 className="text-sm font-normal tracking-wider uppercase mb-4 text-ivory" style={{ letterSpacing: "1.5px" }}>
              Questions?
            </h4>
            <p className="text-ivory">
              Reach out to us directly if you have any questions about the celebration.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-ivory/70 text-sm">
            Made with love for our favorite people
          </p>
        </div>
      </div>
    </footer>
  );
}
