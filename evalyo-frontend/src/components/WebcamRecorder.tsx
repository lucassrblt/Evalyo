import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

const WebcamRecorder = () => {
  const webcamRef = useRef(null); // Reference to the webcam component
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  // Start recording
  const startRecording = () => {
    const stream = webcamRef.current.getScreenshot(); // Capture the video stream
    const newRecorder = RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm",
      bitsPerSecond: 128000, // Optionally set bitrate
    });
    newRecorder.startRecording();
    setRecorder(newRecorder);
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      const videoUrl = URL.createObjectURL(blob);
      setVideoURL(videoUrl); // Set the video URL for playback
      setIsRecording(false);
    });

    console.log("recorder", recorder);
  };

  // Download the recorded video
  const downloadVideo = () => {
    if (videoURL) {
      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "recorded_video.webm";
      a.click();
    }
  };

  return (
    <div>
      <Webcam
        audio={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        width="100%"
        videoHeight="auto"
      />
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {videoURL && (
        <div>
          <h2>Recorded Video</h2>
          <video src={videoURL} controls width="400" height="300" />
          <button onClick={downloadVideo}>Download Video</button>
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;
