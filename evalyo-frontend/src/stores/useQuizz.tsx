import { create } from "zustand";

interface QuizState {
  // State properties
  creationType: string;
  quizzForm: {
    title: string;
    description: string;
    expiration: string;
    questions: [];
  };
  quizz: any;

  // Actions (methods that modify state)
  actions: {
    setQuizz: (tests: any) => void;
    getCreatedQuizz: (userId: string) => Promise<void>;
    setCreationType: (creationType: string) => void;
    setQuizzForm: (quizzForm: {}) => void;
    transformJsonToQuizzForm: (json: any) => Promise<void>;
  };
}

const useQuizz = create<QuizState>((set) => ({
  creationType: "",
  quizzForm: {
    title: "",
    description: "",
    expiration: "",
    questions: [],
  },
  quizz: {},

  actions: {
    setQuizz: (quizz: {}) =>
      set((state) => ({ quizz }), false, "quiz/setQuizz"),

    getCreatedQuizz: async (userId: string) => {
      try {
        const response = await fetch(`api/users/${userId}/quizz`);

        const data = await response.json();
        console.log("data", data);
        if (data.success) {
          set((state) => ({ quizz: data.data }), false, "quiz/fetchQuizz");
        } else {
          console.error("Failed to fetch tests:", data.message);
        }
      } catch (err) {
        console.log(err);
      }
    },

    setCreationType: (creationType: string) =>
      set((state) => ({ creationType }), false, "quiz/setCreationType"),

    setQuizzForm: (quizzForm: {}) =>
      set((state) => ({ quizzForm }), false, "quiz/setQuizzForm"),

    transformJsonToQuizzForm: async (json: any) => {
      const extractJsonRegex = /```json\n([\s\S]*?)\n```/;
      const match = extractJsonRegex.exec(json);
      const jsonString = match ? match[1] : null;
      if (!jsonString) {
        console.error("No JSON string found in the input");
        return;
      }
      const data = await JSON.parse(jsonString);

      const quizzForm = {
        title: data.title,
        description: data.description,
        expiration: data.expiration,
        questions: data.questions,
      };

      set((state) => ({ quizzForm }), false, "quiz/transformJsonToQuizzForm");
    },
  },
}));

export const useQuizzStore = () => useQuizz((state) => state.quizz);
export const useCreationType = () => useQuizz((state) => state.creationType);
export const useQuizzForm = () => useQuizz((state) => state.quizzForm);
export const useQuizActions = () => useQuizz((state) => state.actions);
