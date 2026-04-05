"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion()` can differ between server and first client paint, which
 * triggers hydration errors. This hook matches SSR until after mount, then uses
 * the real prefers-reduced-motion value.
 */
export function useHydrationSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  if (!mounted) return false;
  return reduced ?? false;
}
