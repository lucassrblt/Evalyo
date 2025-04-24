interface IAuthContext {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: string; message: string }>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ status: string; message: string }>;
}

interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  token: number;
}

interface IQuizz {
  id: string;
  userId: string;
  title: string;
  description: string;
  record: boolean;
  expiration: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

interface IQuizzForm {
  title: string;
  description: string;
  expiration: string;
  questions: IQuestion[];
}

interface IQuestion {
  id?: string;
  question: string;
  responses: string[];
  time: number;
  answer: number;
}
