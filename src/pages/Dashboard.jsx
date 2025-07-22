import React from "react";
import { auth } from "../firebase";

export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Welcome to Dashboard</h2>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}