import { Button } from "antd";
import { CircleHelp, Clock, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";
import { useQuizActions } from "../../stores/useQuizz";

export const EvaluationDashboard = () => {
  const navigate = useNavigate();
  const [messageApi] = message.useMessage();
  const [createdQuizz, setCreatedQuizz] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getCreatedQuizz, setQuizz } = useQuizActions();

  useEffect(() => {
    if (user.id) {
      fetchQuizz();
    }
  }, [user]);

  const fetchQuizz = async () => {
    const response = await getCreatedQuizz(user.id);
    console.log("response", response);
    if (!response.success) {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    } else {
      setQuizz(response.data);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full h-fit justify-between px-12 py-8 flex-col gap-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <p className="flex text-xl font-poppins font-semibold text-slate-900">
            Your Quizz
          </p>
        </div>
        <Button onClick={() => navigate("create")}>Create Quizz</Button>
      </div>
      {loading ? <p>Loading... </p> : <QuizzMapper quizzs={createdQuizz} />}
    </div>
  );
};

const QuizzMapper = ({ quizzs }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {quizzs.map((item) => (
        <QuizzCard key={item.id} quizz={item} />
      ))}
    </div>
  );
};

const QuizzCard = ({ quizz }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 gap-3 flex flex-col w-fit">
      <div className="flex flex-col gap-1.5">
        <p>{quizz.title}</p>
        <p className="flex font-poppins font-medium text-sm text-slate-500">
          {quizz.description}
        </p>
      </div>
      <div className="w-full justify-between items-center flex gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-md py-1.5 px-2 bg-purple-100/50 flex gap-2">
            <CircleHelp size={18} className="stroke-purple-800" />
            <p className="text-sm font-poppins text-purple-800 font-regular">
              {quizz.questions.length}
            </p>
          </div>
          <div className="rounded-md py-1.5 px-2 bg-purple-100/50 flex gap-2">
            <Clock size={18} className="stroke-purple-800" />
            <p className="text-sm font-poppins text-purple-800 font-regular">
              {new Date(quizz.createdAt).toLocaleDateString("fr-FR", {})}
            </p>
          </div>
        </div>
        <Button onClick={() => navigate(`/quizz/${quizz.id}`)}>Edit</Button>
      </div>
    </div>
  );
};
