
import { useMemo } from "react";
import { contentFrameworks, platformBestPractices, culturalContextGuidelines } from "@/data/contentKnowledgeBase";

/**
 * Hook to provide structured marketing & branding frameworks/guidelines.
 */
export function useContentKnowledgeBase() {
  // In a real app, could make this dynamic/fetchable; for now, local.
  return useMemo(() => ({
    contentFrameworks,
    platformBestPractices,
    culturalContextGuidelines,
  }), []);
}
