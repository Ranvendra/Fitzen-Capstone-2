import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import GoogleLogin from "../components/GoogleLogin";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSwitch={() => setIsLogin(true)} />
      )}
      <GoogleLogin />
    </div>
  );
}