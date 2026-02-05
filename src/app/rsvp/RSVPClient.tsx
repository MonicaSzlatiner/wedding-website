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
          className="pt-24 pb-16 md:pt-32 md:pb-20" 
          style={{ backgroundColor: "#2D2926" }}
        >
          <Container size="content">
            <div className="text-center px-2">
              <h1 
                className="font-serif text-4xl md:text-6xl italic text-white"
                style={{ fontWeight: 400 }}
              >
                Thank You!
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
          <Container size="content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-xl mx-auto px-2"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
              >
                <CheckCircleIcon className="h-10 w-10" style={{ color: "#C37B60" }} />
              </div>
              <h2 
                className="font-serif text-2xl md:text-3xl italic mb-4"
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                {attending ? "We can't wait to see you!" : "We'll miss you!"}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
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
        className="pt-24 pb-16 md:pt-32 md:pb-20" 
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <Container size="content">
          <div className="text-center px-2">
            <p 
              className="text-[10px] uppercase font-bold mb-4"
              style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.5)" }}
            >
              {isUpdate ? "Update Your Response" : "You're Invited"}
            </p>
            <h1 
              className="font-serif text-4xl md:text-6xl italic mb-4 md:mb-6"
              style={{ fontWeight: 400, color: "#2D2926" }}
            >
              RSVP
            </h1>
            <p className="text-base md:text-lg" style={{ color: "rgba(45, 41, 38, 0.6)" }}>
              Dear {firstName}, please respond by {deadline}
            </p>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F5F5F0" }}>
        <Container size="content">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {/* Guest Name Display */}
            <div className="text-center mb-8 md:mb-12">
              <p 
                className="text-[10px] uppercase font-bold mb-2"
                style={{ letterSpacing: "0.3em", color: "#C37B60" }}
              >
                Responding for
              </p>
              <p 
                className="font-serif text-2xl md:text-3xl italic"
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                {guest.name}
              </p>
            </div>

            {/* Attendance */}
            <div className="mb-8">
              <label 
                className="block text-[10px] uppercase font-bold mb-4 text-center"
                style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
              >
                Will you be attending?
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`px-6 py-4 rounded-lg font-sans text-[10px] uppercase font-bold transition-all ${
                    attending === true 
                      ? "text-white shadow-lg" 
                      : "bg-white border hover:border-espresso/40"
                  }`}
                  style={attending === true 
                    ? { backgroundColor: "#2D2926", letterSpacing: "0.2em" } 
                    : { letterSpacing: "0.2em", borderColor: "rgba(45, 41, 38, 0.2)", color: "#2D2926" }
                  }
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`px-6 py-4 rounded-lg font-sans text-[10px] uppercase font-bold transition-all ${
                    attending === false 
                      ? "text-white shadow-lg" 
                      : "bg-white border hover:border-espresso/40"
                  }`}
                  style={attending === false 
                    ? { backgroundColor: "#2D2926", letterSpacing: "0.2em" } 
                    : { letterSpacing: "0.2em", borderColor: "rgba(45, 41, 38, 0.2)", color: "#2D2926" }
                  }
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
                  <div 
                    className="mb-8 p-6 rounded-lg"
                    style={{ backgroundColor: "rgba(45, 41, 38, 0.03)", border: "1px solid rgba(45, 41, 38, 0.1)" }}
                  >
                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={plusOneAttending}
                        onChange={(e) => setPlusOneAttending(e.target.checked)}
                        className="w-5 h-5 rounded border-2 text-terracotta focus:ring-terracotta"
                        style={{ borderColor: "rgba(45, 41, 38, 0.3)" }}
                      />
                      <span className="text-sm" style={{ color: "#2D2926" }}>
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
                            className="block text-[10px] uppercase font-bold mb-2"
                            style={{ letterSpacing: "0.2em", color: "rgba(45, 41, 38, 0.6)" }}
                          >
                            Guest Name
                          </label>
                          <input
                            type="text"
                            value={plusOneName}
                            onChange={(e) => setPlusOneName(e.target.value)}
                            placeholder="Enter guest name"
                            className="w-full px-4 py-3 rounded-lg border focus:ring-1 outline-none"
                            style={{ 
                              backgroundColor: "#FFFFFF",
                              borderColor: "rgba(45, 41, 38, 0.2)",
                            }}
                          />
                        </div>

                        <div>
                          <label 
                            className="block text-[10px] uppercase font-bold mb-2"
                            style={{ letterSpacing: "0.2em", color: "rgba(45, 41, 38, 0.6)" }}
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
                                  className="w-4 h-4 text-terracotta focus:ring-terracotta"
                                />
                                <span className="text-sm" style={{ color: "#2D2926" }}>
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
                    className="block text-[10px] uppercase font-bold mb-4 text-center"
                    style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.6)" }}
                  >
                    Your Meal Preference
                  </label>
                  <div className="space-y-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <label 
                        key={option.value} 
                        className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg transition-all ${
                          dietaryChoice === option.value 
                            ? "border-2" 
                            : "bg-white border-2 border-transparent hover:border-espresso/10"
                        }`}
                        style={dietaryChoice === option.value 
                          ? { backgroundColor: "rgba(195, 123, 96, 0.1)", borderColor: "#C37B60" }
                          : {}
                        }
                      >
                        <input
                          type="radio"
                          name="dietary"
                          value={option.value}
                          checked={dietaryChoice === option.value}
                          onChange={(e) => setDietaryChoice(e.target.value)}
                          className="w-4 h-4 text-terracotta focus:ring-terracotta"
                        />
                        <span className="text-sm" style={{ color: "#2D2926" }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Considerations */}
                <div className="mb-8">
                  <label 
                    className="block text-[10px] uppercase font-bold mb-3"
                    style={{ letterSpacing: "0.2em", color: "rgba(45, 41, 38, 0.6)" }}
                  >
                    Allergies or Special Considerations
                  </label>
                  <textarea
                    value={specialConsiderations}
                    onChange={(e) => setSpecialConsiderations(e.target.value)}
                    placeholder="Please let us know of any allergies or dietary restrictions..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-1 outline-none resize-none"
                    style={{ 
                      backgroundColor: "rgba(45, 41, 38, 0.03)",
                      borderColor: "rgba(45, 41, 38, 0.1)",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div 
                className="mb-6 p-4 rounded-lg text-center text-sm"
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
                className={`px-10 py-4 rounded-full font-sans text-[10px] uppercase font-bold transition-all ${
                  isSubmitting || attending === null
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90 active:scale-[0.98]"
                }`}
                style={{ 
                  backgroundColor: "#2D2926", 
                  color: "#F5F5F0",
                  letterSpacing: "0.3em"
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
