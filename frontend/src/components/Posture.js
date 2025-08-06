import React, { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const Posture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [poseLandmarks, setPoseLandmarks] = useState(null);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null
    ) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    function onResults(results) {
      setPoseLandmarks(results.poseLandmarks);
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          window.POSE_CONNECTIONS,
          { color: "#00FF00", lineWidth: 4 }
        );
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });

        const feedbackText = window.checkPosture("Squats", results.poseLandmarks);
        setFeedback(feedbackText);
      }
      canvasCtx.restore();
    }
  }, []);

  const saveScore = () => {
    if (poseLandmarks) {
      // In a real app, you would save the score to your database.
      // For this example, we'll just log it to the console.
      console.log("Posture score:", poseLandmarks);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640px" height="480px"></canvas>
      <p>{feedback}</p>
      <button onClick={saveScore}>Save Score</button>
    </div>
  );
};

export default Posture;
