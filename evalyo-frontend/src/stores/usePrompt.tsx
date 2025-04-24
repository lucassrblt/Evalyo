import { create } from "zustand";

export const usePrompt = create((set) => ({
  jobs: [
    { id: 1, name: "Developpement", icon: "🧮" },
    { id: 2, name: "Ressource humaine", icon: "📜" },
    { id: 3, name: "Product Manager", icon: "🌍" },
    { id: 4, name: "Software ingennier", icon: "🔬" },
  ],
  questionsNum: null,

  selectedJob: null,
  input: "",
  themes: [],
  initalThemes: [
    { id: 1, name: "Developpement", icon: "🧮" },
    { id: 2, name: "Ressource humaine", icon: "📜" },
    { id: 3, name: "Product Manager", icon: "🌍" },
    { id: 4, name: "Science", icon: "🔬" },
  ],
  difficulties: [
    { id: 1, name: "Very Easy" },
    { id: 2, name: "Easy" },
    { id: 3, name: "Medium" },
    { id: 4, name: "Hard" },
    { id: 5, name: "Very hard" },
  ],
  selectedDifficulty: null,
  langs: [
    { id: 1, name: "English", icon: "🇬🇧" },
    { id: 2, name: "French", icon: "🇫🇷" },
    { id: 3, name: "Spanish", icon: "🇪🇸" },
    { id: 4, name: "Japanese", icon: "🇯🇵" },
  ],
  selectedLang: null,
  response: null,
  loading: false,

  setJobs: (jobs: any) => set({ jobs }),
  setQuestionsNum: (questionsNum: any) => set({ questionsNum }),
  setSelectedJob: (selectedJob: any) => set({ selectedJob }),
  setInput: (input: any) => set({ input }),
  setThemes: (themes: any) => set({ themes }),
  setSelectedDifficulty: (selectedDifficulty: any) =>
    set({ selectedDifficulty }),
  setSelectedLang: (selectedLang: any) => set({ selectedLang }),
  setResponse: (response: any) => set({ response }),
  setLoading: (loading: any) => set({ loading }),
  setDifficulties: (difficulties: any) => set({ difficulties }),
  setLangs: (langs: any) => set({ langs }),
  setInitalThemes: (initalThemes: any) => set({ initalThemes }),
}));
