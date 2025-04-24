import { useLabel } from "../../stores/useButton";

export const MainButton = ({ onClick }) => {
  const label = useLabel();
  return (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded fixed bottom-8 w-2xl"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
