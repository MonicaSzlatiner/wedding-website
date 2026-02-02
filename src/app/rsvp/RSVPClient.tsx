"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Guest, RSVP, submitRSVP } from "@/lib/supabase";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface RSVPClientProps {
  guest: Guest;
  existingRSVP: RSVP | null;
  deadline: string;
}

// Dietary options - customize labels as needed
const DIETARY_OPTIONS = [
  { value: "A", label: "Option A - Meat" },
  { value: "B", label: "Option B - Fish" },
  { value: "C", label: "Option C - Vegetarian" },
];

export function RSVPClient({ guest, existingRSVP, deadline }: RSVPClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [attending, setAttending] = useState<boolean | null>(
    existingRSVP?.attending ?? null
  );
  const [plusOneName, setPlusOneName] = useState(
    existingRSVP?.plus_one_name || ""
  );
  const [plusOneAttending, setPlusOneAttending] = useState<boolean>(
    existingRSVP?.plus_one_attending ?? false
  );
  const [dietaryChoice, setDietaryChoice] = useState(
    existingRSVP?.dietary_choice || ""
  );
  const [plusOneDietaryChoice, setPlusOneDietaryChoice] = useState(
    existingRSVP?.plus_one_dietary_choice || ""
  );
  const [specialConsiderations, setSpecialConsiderations] = useState(
    existingRSVP?.special_considerations || ""
  );

  const firstName = guest.name.split(" ")[0];
  const isUpdate = !!existingRSVP;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attending === null) {
      setError("Please let us know if you can attend.");
      return;
    }

    if (attending && !dietaryChoice) {
      setError("Please select a meal preference.");
      return;
    }

    if (guest.plus_one_allowed && plusOneAttending && !plusOneDietaryChoice) {
      setError("Please select a meal preference for your guest.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await submitRSVP(guest.id, {
      attending,
      plus_one_name: plusOneAttending ? plusOneName : null,
      plus_one_attending: guest.plus_one_allowed ? plusOneAttending : null,
      dietary_choice: attending ? dietaryChoice : null,
      plus_one_dietary_choice: plusOneAttending ? plusOneDietaryChoice : null,
      special_considerations: specialConsiderations || null,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <>
        <section 
          className="pt-24 pb-12 md:pt-32 md:pb-16" 
          style={{ backgroundColor: "#6B705C" }}
        >
          <Container size="content">
            <div className="text-center px-2">
              <h1 
                className="font-serif text-4xl md:text-6xl text-white"
                style={{ fontWeight: 400 }}
              >
                Thank You!
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
          <Container size="content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-xl mx-auto py-8 px-2"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                style={{ backgroundColor: "rgba(107, 112, 92, 0.15)" }}
              >
                <CheckCircleIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: "#6B705C" }} />
              </div>
              <h2 
                className="font-serif text-2xl md:text-3xl mb-3 md:mb-4"
                style={{ color: "#1A1A1A", fontWeight: 400 }}
              >
                {attending ? "We can't wait to see you!" : "We'll miss you!"}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                {attending 
                  ? "Your RSVP has been received. We're so excited to celebrate with you!"
                  : "Thank you for letting us know. We'll be thinking of you on our special day."}
              </p>
              <Button href="/" variant="primary">
                View Wedding Details
              </Button>
            </motion.div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section 
        className="pt-24 pb-12 md:pt-32 md:pb-16" 
        style={{ backgroundColor: "#6B705C" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-white/50 text-xs md:text-sm uppercase mb-3 md:mb-4"
              style={{ letterSpacing: "0.2em" }}
            >
              {isUpdate ? "Update Your Response" : "You're Invited"}
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl text-white mb-4 md:mb-6"
              style={{ fontWeight: 400 }}
            >
              RSVP
            </h1>
            <p className="text-white/70 text-base md:text-lg">
              Dear {firstName}, please respond by {deadline}
            </p>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#E8E6E1" }}>
        <Container size="content">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {/* Guest Name Display */}
            <div className="text-center mb-8 md:mb-12">
              <p 
                className="text-xs md:text-sm uppercase mb-2"
                style={{ letterSpacing: "0.15em", color: "#6B705C" }}
              >
                Responding for
              </p>
              <p 
                className="font-serif text-2xl md:text-3xl"
                style={{ color: "#1A1A1A", fontWeight: 400 }}
              >
                {guest.name}
              </p>
            </div>

            {/* Attendance */}
            <div className="mb-8">
              <label 
                className="block text-sm font-medium uppercase mb-4 text-center"
                style={{ letterSpacing: "0.1em", color: "#1A1A1A" }}
              >
                Will you be attending?
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`px-8 py-4 rounded-xl font-sans text-sm uppercase transition-all ${
                    attending === true 
                      ? "text-white shadow-lg" 
                      : "bg-white text-charcoal border border-charcoal/20 hover:border-charcoal/40"
                  }`}
                  style={attending === true ? { backgroundColor: "#6B705C", letterSpacing: "0.1em" } : { letterSpacing: "0.1em" }}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`px-8 py-4 rounded-xl font-sans text-sm uppercase transition-all ${
                    attending === false 
                      ? "text-white shadow-lg" 
                      : "bg-white text-charcoal border border-charcoal/20 hover:border-charcoal/40"
                  }`}
                  style={attending === false ? { backgroundColor: "#6B705C", letterSpacing: "0.1em" } : { letterSpacing: "0.1em" }}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Conditional fields when attending */}
            {attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {/* Plus One Section */}
                {guest.plus_one_allowed && (
                  <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={plusOneAttending}
                        onChange={(e) => setPlusOneAttending(e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-charcoal/30 text-sage focus:ring-sage"
                      />
                      <span className="text-sm" style={{ color: "#1A1A1A" }}>
                        I will be bringing a guest
                      </span>
                    </label>

                    {plusOneAttending && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 mt-4"
                      >
                        <div>
                          <label 
                            className="block text-xs uppercase mb-2"
                            style={{ letterSpacing: "0.1em", color: "rgba(26, 26, 26, 0.6)" }}
                          >
                            Guest Name
                          </label>
                          <input
                            type="text"
                            value={plusOneName}
                            onChange={(e) => setPlusOneName(e.target.value)}
                            placeholder="Enter guest name"
                            className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-sage focus:ring-1 focus:ring-sage outline-none"
                            style={{ backgroundColor: "#FFFFFF" }}
                          />
                        </div>

                        <div>
                          <label 
                            className="block text-xs uppercase mb-2"
                            style={{ letterSpacing: "0.1em", color: "rgba(26, 26, 26, 0.6)" }}
                          >
                            Guest Meal Preference
                          </label>
                          <div className="space-y-2">
                            {DIETARY_OPTIONS.map((option) => (
                              <label 
                                key={option.value} 
                                className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/50 transition-colors"
                              >
                                <input
                                  type="radio"
                                  name="plusOneDietary"
                                  value={option.value}
                                  checked={plusOneDietaryChoice === option.value}
                                  onChange={(e) => setPlusOneDietaryChoice(e.target.value)}
                                  className="w-4 h-4 text-sage focus:ring-sage"
                                />
                                <span className="text-sm" style={{ color: "#1A1A1A" }}>
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Dietary Choice */}
                <div className="mb-8">
                  <label 
                    className="block text-sm font-medium uppercase mb-4 text-center"
                    style={{ letterSpacing: "0.1em", color: "#1A1A1A" }}
                  >
                    Your Meal Preference
                  </label>
                  <div className="space-y-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <label 
                        key={option.value} 
                        className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl transition-all ${
                          dietaryChoice === option.value 
                            ? "bg-sage/10 border-2 border-sage" 
                            : "bg-white border-2 border-transparent hover:border-charcoal/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dietary"
                          value={option.value}
                          checked={dietaryChoice === option.value}
                          onChange={(e) => setDietaryChoice(e.target.value)}
                          className="w-4 h-4 text-sage focus:ring-sage"
                        />
                        <span className="text-sm" style={{ color: "#1A1A1A" }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Considerations */}
                <div className="mb-8">
                  <label 
                    className="block text-sm font-medium uppercase mb-3"
                    style={{ letterSpacing: "0.1em", color: "#1A1A1A" }}
                  >
                    Allergies or Special Considerations
                  </label>
                  <textarea
                    value={specialConsiderations}
                    onChange={(e) => setSpecialConsiderations(e.target.value)}
                    placeholder="Please let us know of any allergies or dietary restrictions..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-sage focus:ring-1 focus:ring-sage outline-none resize-none"
                    style={{ backgroundColor: "#F8F9FA" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div 
                className="mb-6 p-4 rounded-xl text-center text-sm"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#DC2626" }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || attending === null}
                className={`px-10 py-4 rounded-full font-sans text-sm uppercase transition-all ${
                  isSubmitting || attending === null
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg active:scale-[0.98]"
                }`}
                style={{ 
                  backgroundColor: "#6B705C", 
                  color: "#F8F9FA",
                  letterSpacing: "0.15em"
                }}
              >
                {isSubmitting ? "Submitting..." : isUpdate ? "Update Response" : "Submit RSVP"}
              </button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
