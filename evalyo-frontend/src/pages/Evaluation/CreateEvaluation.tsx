import { Button, Input, message } from "antd";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import usePrompt from "../../hook/usePrompt.tsx";
import TypeChoosing from "../../components/partial/TypeChoosing.tsx";
import { useCreationType } from "../../stores/useQuizz.tsx";
import TestFromPdf from "./TestFromPdf.tsx";

export const CreateEvaluation = () => {
  const { fetchPrompt } = usePrompt();
  const creationType = useCreationType();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = async () => {
    const response = await fetchPrompt();
    console.log("response", response);
    if (!response?.success) {
      messageApi.open({
        type: "error",
        content: response?.message,
        style: {
          display: "flex",
        },
      });
    }
  };

  return (
    <section className="flex flex-col overflox-y-auto px-12 py-8 gap-4 w-full items-center justify-center h-full">
      {contextHolder}
      {creationType === "" && (
        <TypeChoosing
          formText="Create a test for your candidate by filling a form"
          pdfText="Create a test for your candidate by filling a form"
        />
      )}
      {creationType === "form" && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <p className="flex text-xl font-poppins font-semibold text-slate-900">
                Your Quizz
              </p>
            </div>
            <Button onClick={() => handleCreate()}>Create</Button>
          </div>
          <JobChoice />
          <LangChoice />
          <QuestionsNumber />
          <DifficultyChoice />
        </>
      )}
      {creationType === "pdf" && (
        <>
          <TestFromPdf />
        </>
      )}
    </section>
  );
};

const QuestionsNumber = () => {
  const { setQuestionsNum, questionsNum } = usePrompt();
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-xl text-slate-950">
          Number of questions
        </p>
        <p className="font-poppins font-regular text-md text-gray-700">
          Choose your number of questions in your test
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            onClick={() => setQuestionsNum(index + 1)}
            className={clsx(
              "flex items-center justify-center h-16 w-16 transition-all rounded-lg hover:bg-purple-100 hover:scale-105 bg-[#FAFAFA] cursor-pointer",
              {
                "border border-purple-800 bg-purple-100":
                  questionsNum == index + 1,
              }
            )}
          >
            <p className="text-md font-poppins font-regular text-slate-950">
              {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobChoice = () => {
  const [input, setInput] = useState("");
  const { setJobs, jobs, selectedJob, setSelectedJob } = usePrompt();

  const selectJob = (id: number) => {
    setSelectedJob(id);
  };

  const addJob = () => {
    if (input.length > 0) {
      setJobs((prev) => [
        ...prev,
        { id: prev.length + 1, name: input, icon: "🧮" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-xl text-slate-950">
          Candidature type
        </p>
        <p className="font-poppins font-regular text-md text-gray-700">
          Choose your candidature type
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {jobs.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "flex gap-2 items-center py-2 px-4 transition-all rounded-lg hover:bg-purple-100 hover:scale-105 bg-[#FAFAFA] cursor-pointer",
              {
                "border border-purple-800 bg-purple-100":
                  selectedJob == item.id,
              }
            )}
            onClick={() => selectJob(item.id)}
          >
            <p>{item.icon}</p>
            <p className="font-poppins font-regular text-sm text-slate-950">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter your job if not present on the list below"
          onChange={(e) => setInput(e.target.value)}
        />
        <div
          className="bg-gray-100 right-5 rounded-md w-10 h-10 flex justify-center items-center transition-all hover:bg-purple-100 cursor-pointer hover:scale-105"
          onClick={addJob}
        >
          <Plus size={18} className="stroke-slate-500" />
        </div>
      </div>
    </div>
  );
};

const ThemeChoice = () => {
  const [themes, setThemes] = useState([]);
  const initalThemes = [
    { id: 1, name: "Developpement", icon: "🧮" },
    { id: 2, name: "Ressource humaine", icon: "📜" },
    { id: 3, name: "Product Manager", icon: "🌍" },
    { id: 4, name: "Science", icon: "🔬" },
  ];
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-xl text-slate-950">
          Number of questions
        </p>
        <p className="font-poppins font-regular text-md text-gray-700">
          Choose your number of questions in your test
        </p>
      </div>

      <div></div>

      <div></div>
    </div>
  );
};

const DifficultyChoice = () => {
  const { difficulties, selectedDifficulty, setSelectedDifficulty } =
    usePrompt();

  const handleClick = (id) => {
    setSelectedDifficulty(id);
  };
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-xl text-slate-950">
          Language selection
        </p>
        <p className="font-poppins font-regular text-md text-gray-700">
          Choose your lang for your quizz
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {difficulties.map((item) => (
          <div
            className={clsx(
              "flex gap-2 items-center py-2 px-4 transition-all rounded-lg hover:bg-purple-100 hover:scale-105 bg-[#FAFAFA] cursor-pointer",
              {
                "border border-purple-800 bg-purple-100":
                  selectedDifficulty == item.id,
              }
            )}
            onClick={() => handleClick(item.id)}
          >
            <p className="font-poppins font-regular text-sm text-slate-950">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LangChoice = () => {
  const { langs, selectedLang, setSelectedLang } = usePrompt();

  const handleClick = (id) => {
    setSelectedLang(id);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-fit py-6 px-10 gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-semibold text-xl text-slate-950">
          Language selection
        </p>
        <p className="font-poppins font-regular text-md text-gray-700">
          Choose your lang for your quizz
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {langs.map((item) => (
          <Lang
            key={item.id}
            lang={item}
            handleClick={handleClick}
            selectedLang={selectedLang}
          />
        ))}
      </div>
    </div>
  );
};

const Lang = ({ lang, handleClick, selectedLang }) => {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center py-2 px-4 transition-all rounded-lg hover:bg-purple-100 hover:scale-105 bg-[#FAFAFA] cursor-pointer",
        { "border border-purple-800 bg-purple-100": selectedLang == lang.id }
      )}
      onClick={() => handleClick(lang.id)}
    >
      <p>{lang.icon}</p>
      <p className="font-poppins font-regular text-sm text-slate-950">
        {lang.name}
      </p>
    </div>
  );
};
