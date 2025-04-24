import { useQuizzForm } from "../../stores/useQuizz";
import clsx from "clsx";
import { Input } from "antd";
import { useState } from "react";

export default function QuestionReview() {
  const quizzForm = useQuizzForm();

  return (
    <section>
      <div className="flex flex-col gap-4">
        <h1 className="font-poppins font-semibold text-2xl text-slate-950">
          Review your quizz
        </h1>

        <div className="flex flex-col gap-4">
          {quizzForm.questions.map((question: IQuestion, index) => (
            <SingleQuestionReview key={index} question={question} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SingleQuestionReview = ({ question }: { question: IQuestion }) => {
  const [responseToEdit, setResponseToEdit] = useState("");

  // const { setQuizzForm } = useQuizActions();

  // const handleResponseToEdit = (value: any) => {
  //   setResponseToEdit(value);
  //   setQuizzForm((prev: IQuizzForm) => ({
  //     ...prev,
  //     questions: prev.questions.map((q: IQuestion) =>
  //       q.id === question.id
  //         ? {
  //             ...q,
  //             reponses: q.responses.map((r: string, index) =>
  //               index === question.answer ? value : r
  //             ),
  //           }
  //         : q
  //     ),
  //   }));
  // };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-sm text-slate-950">
          Question :
        </p>
        <Input
          placeholder="Enter your job if not present on the list below"
          // onChange={(e) =>
          //   setQuizzForm((prev: IQuizzForm) => ({
          //     ...prev,
          //     questions: prev.questions.map((q: IQuestion) =>
          //       q.id === question.id ? { ...q, question: e.target.value } : q
          //     ),
          //   }))
          // }
          value={question.question}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-sm text-slate-950">
          Réponses :
        </p>
        <div className="flex gap-4 flex-wrap">
          {question.responses.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "flex gap-2 items-center py-2 px-4 transition-all rounded-lg hover:bg-purple-100 hover:scale-105 bg-[#FAFAFA] cursor-pointer",
                {
                  "border border-green-800 bg-green-100":
                    index == question.answer,
                  "border border-purple-800 bg-purple-100":
                    responseToEdit == item,
                }
              )}
              onClick={() => setResponseToEdit(item)}
            >
              <p className="font-poppins font-regular text-sm text-slate-950">
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Choose a response to edit"
            value={responseToEdit}
            // onChange={(e) => handleResponseToEdit(e.target.value)}
          />
          <button className="flex rounded-md bg-green-400 py-2 px-2">
            Good Answer
          </button>
        </div>
      </div>

      {/* <div className="flex items-center gap-2">
        <Input
          placeholder="Enter your job if not present on the list below"
          onChange={(e) => setInput(e.target.value)}
            value={question.}
        />
        <div
          className="bg-gray-100 right-5 rounded-md w-10 h-10 flex justify-center items-center transition-all hover:bg-purple-100 cursor-pointer hover:scale-105"
          onClick={addJob}
        >
          <Plus size={18} className="stroke-slate-500" />
        </div>
      </div> */}
    </div>
  );
};
