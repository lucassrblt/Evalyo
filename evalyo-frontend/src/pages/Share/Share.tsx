import { useParams } from "react-router";
import useQuizz from "../../hook/useQuizz";
import { useEffect, useState } from "react";
import { Modal } from "antd";

export default function Share() {
  const { quizzId } = useParams();
  const { quizz, getQuizz } = useQuizz();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (quizzId) {
      getQuizz(quizzId);
    }
  }, [quizzId]);

  const handleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  return (
    <>
      {quizz && quizz.record && (
        <RecordModal isModalOpen={isModalOpen} setIsModalOpen={handleModal} />
      )}
    </>
  );
}

const RecordModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="Authorize Record" open={isModalOpen} onOk={handleOk}>
      <p>
        By allowing recording you permits to our team to record a video of you
        during the quizz and send it to the company
      </p>
    </Modal>
  );
};
