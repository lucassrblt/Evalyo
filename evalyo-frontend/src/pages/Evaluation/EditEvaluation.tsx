import { useEffect } from "react";
import QuestionReview from "../../components/quizz/QuestionsReview";
import { useParams } from "react-router";

export default function EditQuizz() {
  const { quizzId } = useParams();

  useEffect(() => {
    if (quizzId) {
    }
  }, []);

  return (
    <>
      <QuestionReview />
    </>
  );
}
