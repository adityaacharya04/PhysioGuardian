import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthDetails from "./components/AuthDetails";
import Profile from "./components/Profile";
import Posture from "./components/Posture";
import Recommendations from "./components/Recommendations";
import VideoTutorials from "./components/VideoTutorials";
import FeesPrediction from "./components/FeesPrediction";
import TherapistLocator from "./components/TherapistLocator";
import Chatbot from "./components/Chatbot";
import FAQ from "./components/FAQ";
import ProgressTracker from "./components/ProgressTracker";
import AdminPanel from "./components/AdminPanel";
import Notifications from "./components/Notifications";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <div className="App">
      {authUser ? (
        <>
          <Profile />
          <Posture />
          <Recommendations />
          <VideoTutorials />
          <FeesPrediction />
          <TherapistLocator />
          <Chatbot />
          <FAQ />
          <ProgressTracker />
          <AdminPanel />
          <Notifications />
          <AuthDetails />
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default App;
