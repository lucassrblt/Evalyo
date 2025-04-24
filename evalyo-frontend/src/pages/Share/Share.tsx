import { useParams } from "react-router";
import useQuizz from "../../hook/useQuizz";
import { useEffect, useRef, useState } from "react";
import Questions from "../../components/Questions";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import { Button, message } from "antd";
import { Modal } from "antd";

// export default function Share() {
//   const { quizzId } = useParams();
//   const { quizz, loading, getQuizz } = useQuizz();
//   const [recorder, setRecorder] = useState(null);
//   const [blob, setBlob] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoURL, setVideoURL] = useState(null);
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     if (quizzId) {
//       getQuizz(quizzId);
//     }
//   }, [quizzId]);

//   const startRecording = () => {
//     // Ensure webcam is ready before starting recording
//     if (webcamRef.current) {
//       // Wait a moment to ensure the stream is fully initialized
//       setTimeout(() => {
//         const stream = webcamRef.current.stream;
//         if (stream) {
//           const newRecorder = new RecordRTC(stream, {
//             type: "video",
//             mimeType: "video/webm",
//             bitsPerSecond: 128000,
//           });
//           newRecorder.startRecording();
//           setRecorder(newRecorder);
//           setIsRecording(true);
//           message.success("Recording started");
//         } else {
//           message.error("Webcam stream not available");
//         }
//       }, 100);
//     } else {
//       message.error("Webcam not initialized");
//     }
//   };

//   const sendVideoToServer = async (recordedBlob) => {
//     if (!recordedBlob) {
//       message.error("No video to upload");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       // Use a meaningful filename
//       formData.append("file", recordedBlob, `quiz-recording-${Date.now()}.mp4`);

//       // Add additional form data if needed
//       formData.append("quizzId", quizzId || "");

//       const response = await fetch("/api/videos/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       message.success("Video uploaded successfully");
//       console.log("Upload response:", data);
//     } catch (error) {
//       console.error("Video upload error:", error);
//       message.error("Failed to upload video");
//     }
//   };

//   const stopRecording = () => {
//     if (recorder) {
//       recorder.stopRecording(() => {
//         // Directly get the blob from the recorder
//         const recordedBlob = recorder.getBlob();

//         // Verify blob exists and has content
//         if (recordedBlob && recordedBlob.size > 0) {
//           console.log("Blob size:", recordedBlob.size);

//           // Create URL for video preview
//           const videoUrl = URL.createObjectURL(recordedBlob);

//           // Update state
//           setBlob(recordedBlob);
//           setVideoURL(videoUrl);
//           setIsRecording(false);

//           // Send video to server
//           sendVideoToServer(recordedBlob);
//         } else {
//           message.error("No video recorded");
//           console.error("Recorded blob is empty or undefined");
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <Webcam
//         audio={true}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{
//           width: 1280,
//           height: 720,
//           facingMode: "user",
//         }}
//         style={{ display: "none" }}
//       />

//       {/* Conditional rendering of buttons */}
//       {!isRecording ? (
//         <Button onClick={startRecording}>Start Recording</Button>
//       ) : (
//         <Button onClick={stopRecording} danger>
//           Stop Recording
//         </Button>
//       )}

//       {/* Optional: Display recorded video */}
//       {videoURL && (
//         <video
//           src={videoURL}
//           controls
//           style={{ maxWidth: "100%", marginTop: "20px" }}
//         />
//       )}

//       {loading ? <p>Loading...</p> : <h1>{quizz?.title}</h1>}

//       {quizz?.questions.map((question, index) => (
//         <Questions key={index} question={question} />
//       ))}
//     </div>
//   );
// }

export default function Share() {
  const { quizzId } = useParams();
  const { quizz, loading, getQuizz } = useQuizz();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (quizzId) {
      getQuizz(quizzId);
    }
  }, [quizzId]);

  const handleModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <>
      {quizz.record && (
        <RecordModal isModalOpen={isModalOpen} setIsModalOpen={handleModal} />
      )}
    </>
  );
}

const RecordModal = ({ isModalOpen, setIsModalOpen }) => {
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
