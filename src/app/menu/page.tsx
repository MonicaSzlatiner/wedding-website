import { Metadata } from "next";
import { weddingConfig } from "@/config/content";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `Menu | ${weddingConfig.meta.title}`,
  description: "A peek at the four-course dinner menu by Parkheuvel.",
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  const { menu } = weddingConfig;

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-24 pb-16 md:pt-32 md:pb-20"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p className="text-[10px] uppercase font-bold mb-4 max-w-none" style={{ letterSpacing: "0.3em", color: "#C37B60" }}>
              {menu.eyebrow}
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              {menu.heading}
            </h1>
            <p
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
            >
              {menu.subtitle}
            </p>
            <p
              className="text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed"
              style={{ color: "rgba(45, 41, 38, 0.45)" }}
            >
              {menu.seasonalNote}
            </p>
          </div>
        </Container>
      </section>

      {/* Courses Section */}
      <section
        className="py-12 md:py-16 lg:py-20"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <Container size="content">
          <div>
            {menu.courses.map((course, index) => (
              <div
                key={index}
                className={`text-center py-10 md:py-12 border-t${index === menu.courses.length - 1 ? " border-b" : ""}`}
                style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}
              >
                <p className="text-[10px] uppercase font-bold mb-4 max-w-none" style={{ letterSpacing: "0.3em", color: "#C37B60" }}>
                  {course.course}
                </p>
                <h3
                  className="font-serif text-2xl md:text-3xl italic mb-3"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {course.title}
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "rgba(45, 41, 38, 0.6)" }}
                >
                  {course.accompaniments}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Allergy / Substitutions Section */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#2D2926" }}
      >
        <Container size="content">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] uppercase font-bold mb-4 max-w-none" style={{ letterSpacing: "0.3em", color: "rgba(245, 245, 240, 0.4)" }}>
              {menu.allergyEyebrow}
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl italic text-white mb-4 md:mb-6"
              style={{ fontWeight: 400 }}
            >
              {menu.allergyHeading}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {menu.allergyIntro}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {menu.substitutions.map((sub, index) => (
              <div
                key={index}
                className="rounded-lg p-6 md:p-8"
                style={{
                  backgroundColor: "rgba(245, 245, 240, 0.04)",
                  border: "1px solid rgba(245, 245, 240, 0.08)",
                }}
              >
                <p
                  className="text-[10px] uppercase font-bold mb-3"
                  style={{ letterSpacing: "0.3em", color: "rgba(245, 245, 240, 0.4)" }}
                >
                  Instead of {sub.original}
                </p>
                <h3
                  className="font-serif text-xl md:text-2xl italic text-white mb-2"
                  style={{ fontWeight: 400 }}
                >
                  {sub.replacement}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                  {sub.accompaniments}
                </p>
                {sub.note && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                    {sub.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
