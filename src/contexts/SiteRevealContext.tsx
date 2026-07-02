import { createContext, useContext } from "react";

export interface SiteRevealState {
  /** True once the user has clicked the gateway sphere. Drives all entrance animations. */
  isRevealed: boolean;
  /** True only on the very first visit of the session (cinematic entrance). */
  isCinematic: boolean;
  /** True once the entrance blur and scale animation has fully settled. */
  isSettled: boolean;
}

export const SiteRevealContext = createContext<SiteRevealState>({
  isRevealed: true,   // safe default: non-cinematic pages show content immediately
  isCinematic: false,
  isSettled: true,
});

/** Convenience hook — use inside any component below <SiteRevealContext.Provider> */
export function useSiteReveal(): SiteRevealState {
  return useContext(SiteRevealContext);
}
