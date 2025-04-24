// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

// const WebcamRecorder = () => {
//   // webcamRef est un objet de référence de type ReactWebcam
//   const webcamRef = useRef<Webcam>(null);

//   // Typage du state "recorder" comme une instance de RecordRTCPromisesHandler ou null
//   const [recorder, setRecorder] = useState<RecordRTCPromisesHandler | null>(
//     null
//   );
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [videoURL, setVideoURL] = useState<string | null>(null);

//   // Démarre l'enregistrement
//   const startRecording = () => {
//     if (!webcamRef.current) return;

//     const stream = webcamRef.current.getScreenshot(); // capture une image, mais pour un enregistrement vidéo, il faut un stream vidéo réel
//     const newRecorder = RecordRTC(stream, {
//       type: "video",
//       mimeType: "video/webm",
//       bitsPerSecond: 128000, // Optionnellement, définir le débit binaire
//     });
//     newRecorder.startRecording();
//     setRecorder(newRecorder);
//     setIsRecording(true);
//   };

//   // Arrête l'enregistrement
//   const stopRecording = () => {
//     if (recorder) {
//       recorder.stopRecording(() => {
//         const blob = recorder.getBlob();
//         const videoUrl = URL.createObjectURL(blob);
//         setVideoURL(videoUrl); // Définit l'URL de la vidéo pour la lecture
//         setIsRecording(false);
//       });
//     }
//   };

//   // Télécharge la vidéo enregistrée
//   const downloadVideo = () => {
//     if (videoURL) {
//       const a = document.createElement("a");
//       a.href = videoURL;
//       a.download = "recorded_video.webm";
//       a.click();
//     }
//   };

//   return (
//     <div>
//       <Webcam
//         audio={true}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ facingMode: "user" }}
//         width="100%"
//         videoHeight="auto"
//       />
//       <div>
//         {!isRecording ? (
//           <button onClick={startRecording}>Start Recording</button>
//         ) : (
//           <button onClick={stopRecording}>Stop Recording</button>
//         )}
//       </div>
//       {videoURL && (
//         <div>
//           <h2>Recorded Video</h2>
//           <video src={videoURL} controls width="400" height="300" />
//           <button onClick={downloadVideo}>Download Video</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebcamRecorder;
