"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddressFormData {
  invitation_name: string;
  country: string;
  address_line1: string;
  address_line2: string;
  city: string;
  region: string;
  postal_code: string;
  address_freeform: string;
}

interface AddressCollectionFormProps {
  code: string;
  initialName: string;
  onClose: () => void;
}

const COUNTRIES = [
  { value: "", label: "Select a country" },
  { value: "United States", label: "United States" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "France", label: "France" },
  { value: "Other", label: "Other" },
];

// US States list
const US_STATES = [
  { value: "", label: "Select state" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

export function AddressCollectionForm({
  code,
  initialName,
  onClose,
}: AddressCollectionFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    invitation_name: initialName,
    country: "",
    address_line1: "",
    address_line2: "",
    city: "",
    region: "",
    postal_code: "",
    address_freeform: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch existing address data on mount
  useEffect(() => {
    async function fetchAddressData() {
      try {
        const response = await fetch(`/api/guests/address?code=${code}`);
        const data = await response.json();

        if (data.success && data.guest) {
          setFormData({
            invitation_name: data.guest.invitation_name || initialName,
            country: data.guest.country || "",
            address_line1: data.guest.address_line1 || "",
            address_line2: data.guest.address_line2 || "",
            city: data.guest.city || "",
            region: data.guest.region || "",
            postal_code: data.guest.postal_code || "",
            address_freeform: data.guest.address_freeform || "",
          });
        }
      } catch {
        // Silently fail - form will use initial values
      } finally {
        setIsLoading(false);
      }
    }

    fetchAddressData();
  }, [code, initialName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/guests/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save address");
        setIsSaving(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Shared input styles
  const inputStyles = {
    backgroundColor: "rgba(45, 41, 38, 0.03)",
    borderColor: "rgba(45, 41, 38, 0.15)",
    color: "#2D2926",
  };

  const labelStyles = {
    color: "rgba(45, 41, 38, 0.7)",
    letterSpacing: "0.05em",
  };

  // Render country-specific address fields
  const renderAddressFields = () => {
    switch (formData.country) {
      case "United States":
        return (
          <>
            <div>
              <label
                htmlFor="address_line1"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                Street Address
              </label>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>

            <div>
              <label
                htmlFor="address_line2"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                Apartment, Suite, etc. <span className="opacity-50">(optional)</span>
              </label>
              <input
                type="text"
                id="address_line2"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
                placeholder="Apt 4B"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  htmlFor="region"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  State
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                >
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="postal_code"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="10001"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>
          </>
        );

      case "Netherlands":
        return (
          <>
            <div>
              <label
                htmlFor="address_line1"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                Street and House Number
              </label>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                placeholder="Keizersgracht 123"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="postal_code"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="1015 CJ"
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Amsterdam"
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                />
              </div>
            </div>
          </>
        );

      case "France":
        return (
          <>
            <div>
              <label
                htmlFor="address_line1"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                placeholder="15 Rue de Rivoli"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>

            <div>
              <label
                htmlFor="address_line2"
                className="block text-xs uppercase font-medium mb-2"
                style={labelStyles}
              >
                Address Line 2 <span className="opacity-50">(optional)</span>
              </label>
              <input
                type="text"
                id="address_line2"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
                placeholder="Bâtiment A, Apt 5"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                style={inputStyles}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="postal_code"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="75001"
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs uppercase font-medium mb-2"
                  style={labelStyles}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Paris"
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  style={inputStyles}
                />
              </div>
            </div>
          </>
        );

      case "Other":
        return (
          <div>
            <label
              htmlFor="address_freeform"
              className="block text-xs uppercase font-medium mb-2"
              style={labelStyles}
            >
              Full Address
            </label>
            <textarea
              id="address_freeform"
              name="address_freeform"
              value={formData.address_freeform}
              onChange={handleChange}
              placeholder="Enter your complete mailing address"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none"
              style={inputStyles}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(195, 123, 96, 0.1)" }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#C37B60"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p
          className="font-serif text-xl italic mb-3"
          style={{ color: "#2D2926" }}
        >
          All set. We&apos;ll take it from here.
        </p>
        <p
          className="text-sm mb-6"
          style={{ color: "rgba(45, 41, 38, 0.6)" }}
        >
          Formal invitation coming your way 💌
        </p>
        <button
          onClick={onClose}
          className="text-xs uppercase font-bold transition-opacity hover:opacity-70"
          style={{ color: "#C37B60", letterSpacing: "0.2em" }}
        >
          Close
        </button>
      </motion.div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#C37B60", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name field */}
      <div>
        <label
          htmlFor="invitation_name"
          className="block text-xs uppercase font-medium mb-2"
          style={labelStyles}
        >
          Name on the invitation
        </label>
        <input
          type="text"
          id="invitation_name"
          name="invitation_name"
          value={formData.invitation_name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          style={inputStyles}
        />
      </div>

      {/* Country selector */}
      <div>
        <label
          htmlFor="country"
          className="block text-xs uppercase font-medium mb-2"
          style={labelStyles}
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          style={inputStyles}
        >
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic address fields based on country */}
      <AnimatePresence mode="wait">
        {formData.country && (
          <motion.div
            key={formData.country}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 overflow-hidden"
          >
            {renderAddressFields()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center py-2 px-3 rounded-lg"
          style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#DC2626" }}
        >
          {error}
        </motion.p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSaving}
        className="w-full py-4 rounded-full font-sans text-[10px] uppercase font-bold transition-all duration-200 disabled:opacity-50"
        style={{
          backgroundColor: "#2D2926",
          color: "#F5F5F0",
          letterSpacing: "0.3em",
        }}
      >
        {isSaving ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "#F5F5F0", borderTopColor: "transparent" }}
            />
            Saving...
          </span>
        ) : (
          "Save Details"
        )}
      </button>
    </form>
  );
}
