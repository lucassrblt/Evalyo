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

  setJobs: (jobs) => set({ jobs }),
  setQuestionsNum: (questionsNum) => set({ questionsNum }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setInput: (input) => set({ input }),
  setThemes: (themes) => set({ themes }),
  setSelectedDifficulty: (selectedDifficulty) => set({ selectedDifficulty }),
  setSelectedLang: (selectedLang) => set({ selectedLang }),
  setResponse: (response) => set({ response }),
  setLoading: (loading) => set({ loading }),
  setDifficulties: (difficulties) => set({ difficulties }),
  setLangs: (langs) => set({ langs }),
  setInitalThemes: (initalThemes) => set({ initalThemes }),
}));
