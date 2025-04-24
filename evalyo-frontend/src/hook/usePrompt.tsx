import { useState, useEffect } from "react";

const usePrompt = () => {
  const [jobs, setJobs] = useState([
    { id: 1, name: "Developpement", icon: "🧮" },
    { id: 2, name: "Ressource humaine", icon: "📜" },
    { id: 3, name: "Product Manager", icon: "🌍" },
    { id: 4, name: "Software ingennier", icon: "🔬" },
  ]);
  const [questionsNum, setQuestionsNum] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [input, setInput] = useState("");
  const [themes, setThemes] = useState([]);
  const initalThemes = [
    { id: 1, name: "Developpement", icon: "🧮" },
    { id: 2, name: "Ressource humaine", icon: "📜" },
    { id: 3, name: "Product Manager", icon: "🌍" },
    { id: 4, name: "Science", icon: "🔬" },
  ];
  const [difficulties, setDifficulties] = useState([
    { id: 1, name: "Very Easy" },
    { id: 2, name: "Easy" },
    { id: 3, name: "Medium" },
    { id: 4, name: "Hard" },
    { id: 5, name: "Very hard" },
  ]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [langs, setLangs] = useState([
    { id: 1, name: "English", icon: "🇬🇧" },
    { id: 2, name: "French", icon: "🇫🇷" },
    { id: 3, name: "Spanish", icon: "🇪🇸" },
    { id: 4, name: "Japanese", icon: "🇯🇵" },
  ]);
  const [selectedLang, setSelectedLang] = useState(null);

  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("selectedLang changed to:", selectedLang);
  }, [selectedLang]);

  const fetchPrompt = async () => {
    try {
      const promptResponse = preparePrompt();
      if (!promptResponse.success) {
        return { success: false, message: promptResponse.message };
      }
      console.log("promptresponse", promptResponse.prompt);
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that should help me to create quizz for recruting process",
              },
              {
                role: "user",
                content: promptResponse.prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      extractJson(data.choices[0].message.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const preparePrompt = () => {
    console.log("selectedLang", selectedLang);
    const language = langs.find((lang) => lang.id === selectedLang);
    const difficulty = difficulties.find(
      (diff) => diff.id === selectedDifficulty
    )?.name;
    const jobTarget = jobs.find((job) => job.id === selectedJob)?.name;

    console.log(language, difficulty, jobTarget, questionsNum);
    if (!language || !difficulty || !jobTarget || !questionsNum) {
      return { success: false, message: "Missing configuration variable" };
    }

    const promptToSend = `
    You are a helpful assistant that creates tests for the recruitment process. Please generate a test based on the following parameters:
    - Language: ${language} (e.g., English, French, etc.)
    - Difficulty: ${difficulty} (e.g., easy, medium, hard)
    - Job Target: ${jobTarget} (e.g., software engineer, marketing manager, etc.)
    - Number of Questions: ${questionsNum}
    
    For each question, return an object containing:
    - A "question" key with the test question in the specified language.
    - A "responses" key, which will be an array of potential answers (at least 4 options).
    - An "answer" key with the index (0-based) of the correct answer in the responses array.
    
    The questions should be relevant to the job target and match the difficulty level. Please ensure that the language is appropriate for the job target (e.g., technical for a developer role, management-oriented for a manager role). Also, make sure the responses are plausible but not too obvious to ensure a challenging test.
    
    Generate the test in the specified language, and make sure the answers are clear and well-structured.
    
    Thank you!
    `;

    return {
      prompt: promptToSend,
      success: true,
    };
  };

  const extractJson = (response: string) => {
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : null;
    if (!jsonString) {
      return;
    }
    console.log("jsonString", JSON.parse(jsonString));
    setResponse(JSON.parse(jsonString));
  };

  return {
    response,
    loading,
    fetchPrompt,
    setResponse,
    setLoading,
    jobs,
    setJobs,
    questionsNum,
    setQuestionsNum,
    selectedJob,
    setSelectedJob,
    input,
    setInput,
    themes,
    setThemes,
    initalThemes,
    difficulties,
    setDifficulties,
    selectedDifficulty,
    setSelectedDifficulty,
    langs,
    setLangs,
    selectedLang,
    setSelectedLang,
  };
};

export default usePrompt;
