import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { MainButton } from "../../components/partial/MainButton";
import { useQuizActions } from "../../stores/useQuizz";
import QuestionReview from "../../components/quizz/QuestionsReview";

const { Dragger } = Upload;

export default function TestFromPdf() {
  const [step, setStep] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const { transformJsonToQuizzForm } = useQuizActions();

  const sendPdf = async () => {
    if (!file) {
      message.error("Veuillez sélectionner un fichier");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("/api/quizz/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      await transformJsonToQuizzForm(data.data);
      setStep(1);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Erreur lors du téléchargement du fichier");
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
  };

  const handleClick = async () => {
    await sendPdf();
  };
  return (
    <section className="flex flex-col relative items-center">
      {step === 0 && <UploadTest setFile={handleFile} />}
      {step === 1 && <QuestionReview />}
      <MainButton onClick={handleClick} />
    </section>
  );
}

const UploadTest = ({ setFile }: { setFile: (file: any) => void }) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} n'est pas un fichier PDF`);
      } else {
        setFile(file);
      }
      return false; // Prevent auto upload
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
  };

  return (
    <div className="w-full max-w-md">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Cliquez ou glissez un fichier PDF dans cette zone
        </p>
        <p className="ant-upload-hint">
          Supporte le téléchargement d'un seul fichier PDF.
        </p>
      </Dragger>
    </div>
  );
};
