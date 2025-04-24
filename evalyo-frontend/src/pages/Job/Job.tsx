import TypeChoosing from "../../components/partial/TypeChoosing.tsx";

const Job = () => {
  return (
    <section className="flex flex-col gap-12 w-full h-full items-center justify-center">
      <TypeChoosing
        formText="Create a job from a long form"
        pdfText="Create job from pdf import"
      />
    </section>
  );
};

export default Job;
