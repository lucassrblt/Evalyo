import { create } from "zustand";

interface QuizState {
  // State properties
  creationType: string;
  quizzForm: IQuizzForm;
  quizz: any;

  // Actions (methods that modify state)
  actions: {
    setQuizz: (tests: any) => void;
    getCreatedQuizz: (userId: string) => Promise<IQuizz>;
    setCreationType: (creationType: string) => void;
    setQuizzForm: (quizzForm: IQuizzForm) => void;
    transformJsonToQuizzForm: (json: any) => void;
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
    setQuizz: (quizz: {}) => set(() => ({ quizz }), false),

    getCreatedQuizz: async (userId: string) => {
      try {
        const response = await fetch(`api/users/${userId}/quizz`);

        const data = await response.json();
        if (data.success) {
          set(() => ({ quizz: data.data }), false);
        } else {
          console.error("Failed to fetch tests:", data.message);
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    setCreationType: (creationType: string) =>
      set(() => ({ creationType }), false),

    setQuizzForm: (quizzForm: IQuizzForm) => set(() => ({ quizzForm }), false),

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

      set(() => ({ quizzForm }), false);
    },
  },
}));

export const useQuizzStore = () => useQuizz((state) => state.quizz);
export const useCreationType = () => useQuizz((state) => state.creationType);
export const useQuizzForm = () => useQuizz((state) => state.quizzForm);
export const useQuizActions = () => useQuizz((state) => state.actions);
