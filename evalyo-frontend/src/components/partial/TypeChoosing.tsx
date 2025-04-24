import { Clock, Pencil, FileUp } from "lucide-react";
import { useQuizActions } from "../../stores/useQuizz.tsx";

const TypeChoosing = ({
  formText,
  pdfText,
}: {
  formText: string;
  pdfText: string;
}) => {
  return (
    <section className="flex gap-12 flex-wrap w-full h-full items-center justify-center">
      <FormSelection text={formText} />
      <PdfSelection text={pdfText} />
    </section>
  );
};

const FormSelection = ({ text }: { text: string }) => {
  const { setCreationType } = useQuizActions();
  return (
    <div
      className="flex rounded-xl gap-6 px-8 py-6 items-center justify-center flex-col w-fit h-fit max-w-80 hover:bg-purple-100 hover:scale-105 cursor-pointer transition-all border border-gray-200"
      onClick={() => setCreationType("form")}
    >
      <Pencil size="60" className="stroke-gray-950" />
      <div className="flex flex-col gap-2 items-center">
        <p
          className="text-md text-gray-950 font-poppins font-semibold text-center
            "
        >
          {text}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Clock />
          <p className="text-sm text-slate-600 font-poppins font-regular">
            2 min.
          </p>
        </div>
      </div>
    </div>
  );
};

const PdfSelection = ({ text }) => {
  const { setCreationType } = useQuizActions();
  return (
    <div
      className="flex rounded-xl gap-6 bg-white px-8 py-6 items-center justify-center flex-col w-fit h-fit max-w-80 hover:bg-purple-100 hover:scale-105 cursor-pointer transition-all border border-gray-200"
      onClick={() => setCreationType("pdf")}
    >
      <FileUp size="60" className="stroke-gray-950" />
      <div className="flex flex-col gap-2 items-center">
        <p
          className="text-md text-gray-950 font-poppins font-semibold text-center
            "
        >
          {text}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Clock />
          <p className="text-sm text-slate-600 font-poppins font-regular">
            30 sec.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypeChoosing;
