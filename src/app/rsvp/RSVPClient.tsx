"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { EASING, TIMING } from "@/lib/animations";

interface GuestData {
  id: string;
  name: string;
  has_plus_one: boolean;
  has_submitted: boolean;
  attending: boolean | null;
  dietary_preference: string | null;
  allergies: string | null;
  plus_one_name: string | null;
  plus_one_attending: boolean | null;
  plus_one_dietary_preference: string | null;
  plus_one_allergies: string | null;
}

type DietaryPreference = "standard" | "vegetarian" | "vegan";

const DIETARY_OPTIONS: { value: DietaryPreference; label: string }[] = [
  { value: "standard", label: "No preference" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.normal, ease: EASING.out },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: EASING.out },
  },
};

export function RSVPClient() {
  const shouldReduceMotion = useReducedMotion();

  // Lookup state
  const [nameInput, setNameInput] = useState("");
  const [isLooking, setIsLooking] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  // Guest state
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [attending, setAttending] = useState<boolean | null>(null);
  const [dietary, setDietary] = useState<DietaryPreference | null>(null);
  const [allergies, setAllergies] = useState("");
  const [bringingGuest, setBringingGuest] = useState<boolean | null>(null);
  const [plusOneName, setPlusOneName] = useState("");
  const [plusOneDietary, setPlusOneDietary] = useState<DietaryPreference | null>(null);
  const [plusOneAllergies, setPlusOneAllergies] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  function prefillForm(g: GuestData) {
    setAttending(g.attending);
    setDietary((g.dietary_preference as DietaryPreference) || null);
    setAllergies(g.allergies || "");
    setBringingGuest(g.plus_one_attending ?? null);
    setPlusOneName(g.plus_one_name || "");
    setPlusOneDietary((g.plus_one_dietary_preference as DietaryPreference) || null);
    setPlusOneAllergies(g.plus_one_allergies || "");
  }

  function resetForm() {
    setAttending(null);
    setDietary(null);
    setAllergies("");
    setBringingGuest(null);
    setPlusOneName("");
    setPlusOneDietary(null);
    setPlusOneAllergies("");
    setSubmitError(null);
    setSubmitted(false);
  }

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed || cooldown) return;

    setIsLooking(true);
    setLookupError(null);

    try {
      const res = await fetch("/api/rsvp/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });

      if (res.status === 404) {
        setLookupError(
          "We couldn\u2019t find that name. Make sure it matches your invitation exactly, or reach out to us directly."
        );
        setCooldown(true);
        setTimeout(() => setCooldown(false), 2000);
        return;
      }

      if (!res.ok) {
        setLookupError("Something went wrong. Please try again.");
        return;
      }

      const data: GuestData = await res.json();
      setGuest(data);

      if (data.has_submitted) {
        prefillForm(data);
        setShowForm(false);
        setSubmitted(true);
      } else {
        resetForm();
        setShowForm(true);
      }

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 100);
    } catch {
      setLookupError("Something went wrong. Please try again.");
    } finally {
      setIsLooking(false);
    }
  };

  const handleChangeRsvp = () => {
    if (guest) prefillForm(guest);
    setSubmitted(false);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!guest || attending === null) return;

    if (attending && !dietary) {
      setSubmitError("Please select a dietary preference.");
      return;
    }

    if (attending && guest.has_plus_one && bringingGuest && !plusOneName.trim()) {
      setSubmitError("Please enter your plus one\u2019s name.");
      return;
    }

    if (attending && guest.has_plus_one && bringingGuest && !plusOneDietary) {
      setSubmitError("Please select a dietary preference for your plus one.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/rsvp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: guest.id,
          attending,
          dietary_preference: attending ? dietary : null,
          allergies: attending ? allergies || null : null,
          plus_one_name: attending && bringingGuest ? plusOneName.trim() : null,
          plus_one_attending: attending ? bringingGuest ?? false : null,
          plus_one_dietary_preference:
            attending && bringingGuest ? plusOneDietary : null,
          plus_one_allergies:
            attending && bringingGuest ? plusOneAllergies || null : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Update local guest state so "Change your RSVP" works
      setGuest({
        ...guest,
        has_submitted: true,
        attending,
        dietary_preference: attending ? dietary : null,
        allergies: attending ? allergies || null : null,
        plus_one_name: attending && bringingGuest ? plusOneName.trim() : null,
        plus_one_attending: attending ? bringingGuest ?? false : null,
        plus_one_dietary_preference:
          attending && bringingGuest ? plusOneDietary : null,
        plus_one_allergies:
          attending && bringingGuest ? plusOneAllergies || null : null,
      });

      setSubmitted(true);
      setShowForm(false);

      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Submitted / returning guest confirmation ----
  if (guest && submitted && !showForm) {
    return (
      <div style={{ backgroundColor: "#F5F5F0", minHeight: "100vh" }}>
        <section className="pt-24 pb-16 md:pt-32 md:pb-20">
          <Container size="content">
            <FadeIn>
              <div className="text-center px-2">
                <h1
                  className="font-serif text-4xl md:text-6xl italic mb-6"
                  style={{ fontWeight: 400, color: "#2D2926" }}
                >
                  {attending ? "See You There" : "We\u2019ll Miss You"}
                </h1>
              </div>
            </FadeIn>
          </Container>
        </section>

        <section className="pb-32">
          <Container size="content">
            <FadeIn delay={0.1}>
              <div className="text-center max-w-lg mx-auto px-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#C37B60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p
                  className="text-lg font-light leading-relaxed mb-10"
                  style={{ color: "rgba(45, 41, 38, 0.7)" }}
                >
                  {attending
                    ? "You\u2019re in. We\u2019ll save you a seat and a glass."
                    : "We\u2019ll miss you. But we get it."}
                </p>
                <button
                  type="button"
                  onClick={handleChangeRsvp}
                  className="text-[11px] uppercase font-bold transition-colors hover:text-[#C37B60]"
                  style={{
                    letterSpacing: "0.2em",
                    color: "rgba(45, 41, 38, 0.5)",
                  }}
                >
                  Change your RSVP
                </button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </div>
    );
  }

  // ---- Main page: lookup + form ----
  return (
    <div style={{ backgroundColor: "#F5F5F0", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container size="content">
          <FadeIn>
            <div className="text-center px-2">
              <p
                className="text-[10px] uppercase font-bold mb-4"
                style={{
                  letterSpacing: "0.3em",
                  paddingLeft: "0.3em",
                  color: "rgba(45, 41, 38, 0.5)",
                }}
              >
                You&apos;re Invited
              </p>
              <h1
                className="font-serif text-5xl md:text-7xl italic mb-6"
                style={{ fontWeight: 400, color: "#2D2926" }}
              >
                RSVP
              </h1>
              <p
                className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto"
                style={{ color: "rgba(45, 41, 38, 0.65)" }}
              >
                We need a headcount and a dinner order. Type your name exactly
                as it appears on your invitation, and we&apos;ll pull up your
                details.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Name lookup */}
      <section className="pb-8 md:pb-12">
        <Container size="content">
          <FadeIn delay={0.15}>
            <form
              onSubmit={handleLookup}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setLookupError(null);
                  }}
                  placeholder="Your full name"
                  className="flex-1 px-5 py-4 text-base rounded-xl border outline-none transition-colors duration-200 focus:border-[#C37B60]"
                  style={{
                    backgroundColor: "white",
                    borderColor: lookupError
                      ? "rgba(220, 38, 38, 0.4)"
                      : "rgba(45, 41, 38, 0.15)",
                    color: "#2D2926",
                  }}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLooking || cooldown || !nameInput.trim()}
                  className="px-6 py-4 rounded-xl text-[11px] uppercase font-bold transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  style={{
                    backgroundColor: "#2D2926",
                    color: "#F5F5F0",
                    letterSpacing: "0.15em",
                  }}
                >
                  {isLooking ? "..." : "Find me"}
                </button>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {lookupError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-sm text-center leading-relaxed"
                    style={{ color: "rgba(45, 41, 38, 0.6)" }}
                  >
                    {lookupError}{" "}
                    <a
                      href="mailto:laurensandmonica@gmail.com"
                      className="underline transition-colors hover:text-[#C37B60]"
                    >
                      laurensandmonica@gmail.com
                    </a>
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </Container>
      </section>

      {/* RSVP Form */}
      <AnimatePresence mode="wait">
        {guest && showForm && (
          <motion.section
            key="rsvp-form"
            ref={formRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionReveal}
            className="pb-32 scroll-mt-24"
          >
            <Container size="content">
              <div className="max-w-lg mx-auto">
                {/* Greeting */}
                <div className="text-center mb-10">
                  <p
                    className="font-serif text-xl md:text-2xl italic"
                    style={{ color: "#2D2926" }}
                  >
                    Hi, {guest.name.split(" ")[0]}. Let&apos;s get you sorted.
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="w-12 h-px mx-auto mb-10"
                  style={{ backgroundColor: "rgba(45, 41, 38, 0.12)" }}
                />

                {/* Attending */}
                <div className="mb-10">
                  <p
                    className="text-[10px] uppercase font-bold mb-5 text-center"
                    style={{
                      letterSpacing: "0.3em",
                      paddingLeft: "0.3em",
                      color: "rgba(45, 41, 38, 0.6)",
                    }}
                  >
                    Will you be joining us?
                  </p>
                  <div className="flex gap-3 justify-center">
                    <ToggleButton
                      selected={attending === true}
                      onClick={() => setAttending(true)}
                    >
                      Yes
                    </ToggleButton>
                    <ToggleButton
                      selected={attending === false}
                      onClick={() => setAttending(false)}
                    >
                      No
                    </ToggleButton>
                  </div>
                </div>

                {/* Attending = Yes flow */}
                <AnimatePresence mode="wait">
                  {attending === true && (
                    <motion.div
                      key="attending-yes"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={sectionReveal}
                    >
                      {/* Dietary preference */}
                      <div className="mb-10">
                        <p
                          className="text-[10px] uppercase font-bold mb-5 text-center"
                          style={{
                            letterSpacing: "0.3em",
                            paddingLeft: "0.3em",
                            color: "rgba(45, 41, 38, 0.6)",
                          }}
                        >
                          Dietary Preference
                        </p>
                        <div className="space-y-3">
                          {DIETARY_OPTIONS.map((opt) => (
                            <DietaryOption
                              key={opt.value}
                              label={opt.label}
                              selected={dietary === opt.value}
                              onClick={() => setDietary(opt.value)}
                              name="dietary"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Allergies */}
                      <div className="mb-10">
                        <label
                          className="block text-[10px] uppercase font-bold mb-3"
                          style={{
                            letterSpacing: "0.2em",
                            color: "rgba(45, 41, 38, 0.6)",
                          }}
                        >
                          Allergies or Dietary Notes
                        </label>
                        <textarea
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          placeholder="Anything the kitchen should know? (e.g. 'no fish, I beg you')"
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border outline-none resize-none transition-colors duration-200 focus:border-[#C37B60]"
                          style={{
                            backgroundColor: "rgba(45, 41, 38, 0.02)",
                            borderColor: "rgba(45, 41, 38, 0.12)",
                            color: "#2D2926",
                          }}
                        />
                      </div>

                      {/* Plus one section */}
                      {guest.has_plus_one && (
                        <PlusOneSection
                          bringingGuest={bringingGuest}
                          setBringingGuest={setBringingGuest}
                          plusOneName={plusOneName}
                          setPlusOneName={setPlusOneName}
                          plusOneDietary={plusOneDietary}
                          setPlusOneDietary={setPlusOneDietary}
                          plusOneAllergies={plusOneAllergies}
                          setPlusOneAllergies={setPlusOneAllergies}
                        />
                      )}
                    </motion.div>
                  )}

                  {attending === false && (
                    <motion.div
                      key="attending-no"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={sectionReveal}
                      className="text-center mb-10"
                    >
                      <p
                        className="font-serif text-lg italic"
                        style={{ color: "rgba(45, 41, 38, 0.5)" }}
                      >
                        We&apos;re sorry to hear that. We&apos;ll miss you.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 p-4 rounded-xl text-center text-sm"
                    style={{
                      backgroundColor: "rgba(220, 38, 38, 0.08)",
                      color: "#DC2626",
                    }}
                  >
                    {submitError}
                  </motion.div>
                )}

                {/* Submit */}
                {attending !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-12 py-4 rounded-full text-[11px] uppercase font-bold transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#2D2926",
                        color: "#F5F5F0",
                        letterSpacing: "0.3em",
                        paddingLeft: "calc(3rem + 0.3em)",
                      }}
                    >
                      {isSubmitting
                        ? "Sending..."
                        : guest.has_submitted
                        ? "Update RSVP"
                        : "Submit RSVP"}
                    </button>
                  </motion.div>
                )}
              </div>
            </Container>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================
   Sub-components
   ============================================ */

function ToggleButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-[100px] px-6 py-3 rounded-lg text-[11px] uppercase font-bold transition-all duration-200"
      style={
        selected
          ? {
              backgroundColor: "#2D2926",
              color: "#F5F5F0",
              letterSpacing: "0.2em",
              paddingLeft: "calc(1.5rem + 0.2em)",
              boxShadow: "0 4px 12px rgba(45, 41, 38, 0.2)",
            }
          : {
              backgroundColor: "white",
              color: "#2D2926",
              letterSpacing: "0.2em",
              paddingLeft: "calc(1.5rem + 0.2em)",
              border: "1px solid rgba(45, 41, 38, 0.15)",
            }
      }
    >
      {children}
    </button>
  );
}

function DietaryOption({
  label,
  selected,
  onClick,
  name,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  name: string;
}) {
  return (
    <label
      className="flex items-center gap-4 cursor-pointer p-4 rounded-xl transition-all duration-200"
      style={
        selected
          ? {
              backgroundColor: "rgba(195, 123, 96, 0.08)",
              border: "1.5px solid #C37B60",
            }
          : {
              backgroundColor: "white",
              border: "1.5px solid rgba(45, 41, 38, 0.1)",
            }
      }
    >
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
        style={{
          borderColor: selected ? "#C37B60" : "rgba(45, 41, 38, 0.25)",
        }}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#C37B60" }}
          />
        )}
      </div>
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onClick}
        className="sr-only"
      />
      <span className="text-base" style={{ color: "#2D2926" }}>
        {label}
      </span>
    </label>
  );
}

function PlusOneSection({
  bringingGuest,
  setBringingGuest,
  plusOneName,
  setPlusOneName,
  plusOneDietary,
  setPlusOneDietary,
  plusOneAllergies,
  setPlusOneAllergies,
}: {
  bringingGuest: boolean | null;
  setBringingGuest: (v: boolean) => void;
  plusOneName: string;
  setPlusOneName: (v: string) => void;
  plusOneDietary: DietaryPreference | null;
  setPlusOneDietary: (v: DietaryPreference) => void;
  plusOneAllergies: string;
  setPlusOneAllergies: (v: string) => void;
}) {
  return (
    <div
      className="mb-10 p-6 rounded-2xl"
      style={{
        backgroundColor: "rgba(45, 41, 38, 0.02)",
        border: "1px solid rgba(45, 41, 38, 0.08)",
      }}
    >
      <p
        className="text-[10px] uppercase font-bold mb-2 text-center"
        style={{
          letterSpacing: "0.3em",
          paddingLeft: "0.3em",
          color: "rgba(45, 41, 38, 0.6)",
        }}
      >
        Plus One
      </p>
      <p
        className="font-serif text-lg italic mb-6 text-center"
        style={{ color: "#2D2926" }}
      >
        You&apos;ve got a plus one. Are you bringing someone?
      </p>

      <div className="flex gap-3 justify-center mb-6">
        <ToggleButton
          selected={bringingGuest === true}
          onClick={() => setBringingGuest(true)}
        >
          Yes
        </ToggleButton>
        <ToggleButton
          selected={bringingGuest === false}
          onClick={() => setBringingGuest(false)}
        >
          No
        </ToggleButton>
      </div>

      <AnimatePresence mode="wait">
        {bringingGuest === true && (
          <motion.div
            key="plus-one-fields"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionReveal}
            className="space-y-6 pt-4"
          >
            <div>
              <label
                className="block text-[10px] uppercase font-bold mb-2"
                style={{
                  letterSpacing: "0.2em",
                  color: "rgba(45, 41, 38, 0.6)",
                }}
              >
                Their Name
              </label>
              <input
                type="text"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
                placeholder="Enter their name"
                className="w-full px-4 py-3 rounded-xl border outline-none transition-colors duration-200 focus:border-[#C37B60]"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(45, 41, 38, 0.15)",
                  color: "#2D2926",
                }}
              />
            </div>

            <div>
              <p
                className="text-[10px] uppercase font-bold mb-3"
                style={{
                  letterSpacing: "0.2em",
                  color: "rgba(45, 41, 38, 0.6)",
                }}
              >
                Their Dietary Preference
              </p>
              <div className="space-y-3">
                {DIETARY_OPTIONS.map((opt) => (
                  <DietaryOption
                    key={opt.value}
                    label={opt.label}
                    selected={plusOneDietary === opt.value}
                    onClick={() => setPlusOneDietary(opt.value)}
                    name="plusOneDietary"
                  />
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-[10px] uppercase font-bold mb-2"
                style={{
                  letterSpacing: "0.2em",
                  color: "rgba(45, 41, 38, 0.6)",
                }}
              >
                Allergies or Dietary Notes
              </label>
              <textarea
                value={plusOneAllergies}
                onChange={(e) => setPlusOneAllergies(e.target.value)}
                placeholder="Anything the kitchen should know? (e.g. 'no fish, I beg you')"
                rows={2}
                className="w-full px-4 py-3 rounded-xl border outline-none resize-none transition-colors duration-200 focus:border-[#C37B60]"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(45, 41, 38, 0.15)",
                  color: "#2D2926",
                }}
              />
            </div>
          </motion.div>
        )}

        {bringingGuest === false && (
          <motion.p
            key="no-plus-one"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center font-serif italic text-sm pt-2"
            style={{ color: "rgba(45, 41, 38, 0.45)" }}
          >
            More cake for us.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
