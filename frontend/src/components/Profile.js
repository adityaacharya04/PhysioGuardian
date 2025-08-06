import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [role, setRole] = useState("user"); // default role

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoURL || "");
        // In a real app, you would fetch the user's role from your database.
        // For this example, we'll just use the state.
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleUpdateProfile = () => {
    // This is where you would update the user's profile in Firebase.
    // This functionality is not yet implemented.
    console.log("Updating profile...");
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Profile</h1>
          <p>Email: {user.email}</p>
          <p>Role: {role}</p>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
