import { useEffect } from "react";
import QuestionReview from "../../components/quizz/QuestionsReview";
import { useParams } from "react-router";

export default function EditEvaluation() {
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
