import { useState } from "react";
import { useNavigate } from "react-router";

const useQuizz = () => {
  const [quizz, setQuizz] = useState<IQuizz | null>(null);
  const [createdQuizz, setCreatedQuizz] = useState<IQuizz | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getCreatedQuizz = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`api/users/${userId}/quizz`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createQuizz = async (quizz: IQuizz) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/quizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizz),
      });
      const data = await response.json();
      if (data.success) {
        setCreatedQuizz(data.data);
        return { success: true };
      }
      return { success: false, message: data.error };
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getQuizz = async (quizzId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quizz/${quizzId}`);
      const data = await response.json();
      console.log("data", data);
      if (data.success && data.error === "Quizz expired") {
        navigate("/share/expired");
      }

      setQuizz(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    quizz,
    loading,
    createQuizz,
    getQuizz,
    getCreatedQuizz,
    createdQuizz,
  };
};

export default useQuizz;
