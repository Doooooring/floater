import { createContext } from "react";

export const FloatContext = createContext<{
  getMaxZ: () => number;
} | null>(null);
