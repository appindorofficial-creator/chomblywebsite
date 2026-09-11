export type LeadershipProfile = {
  name: string;
  publicRole?: string;
  bio: string;
  image?: string;
};

// Intentionally empty until names, titles, bios and publication consent are approved.
export const PUBLIC_LEADERSHIP: readonly LeadershipProfile[] = [];

