import { create } from "zustand";
import { ColorSchemeFragment } from "@/lib/sanity/queries/fragments";

interface ColorSchemeStore {
  colorScheme: ColorSchemeFragment;
  setColorScheme: (colorScheme: ColorSchemeFragment) => void;
}

const useStore = create<ColorSchemeStore>((set) => ({
  colorScheme: {
    name: "light",
    background: { rgb: { r: 0, g: 0, b: 0 } },
    text: { rgb: { r: 0, g: 0, b: 0 } },
    primaryButton: { rgb: { r: 0, g: 0, b: 0 } },
    secondaryButton: { rgb: { r: 0, g: 0, b: 0 } },
    navBarBackground: { rgb: { r: 0, g: 0, b: 0 } },
    navBarText: { rgb: { r: 0, g: 0, b: 0 } },
  },
  setColorScheme: (colorScheme: ColorSchemeFragment) => set({ colorScheme }),
}));

export default useStore;
