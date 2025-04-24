import { create } from "zustand";

interface ButtonState {
  // State properties
  label: string;

  // Actions (methods that modify state)
  actions: {
    setLabel: (label: string) => void;
  };
}

const useQuizz = create<ButtonState>((set) => ({
  label: "Continue",

  actions: {
    setLabel: (label: string) => set(() => ({ label }), false),
  },
}));

export const useLabel = () => useQuizz((state) => state.label);

// If you uncomment this, make sure to add creationType to your ButtonState interface
// export const useCreationType = () => useQuizz((state) => state.creationType);
