import React from "react";
import "./WhatWeDo.css";
import { Dumbbell, HeartPulse, TimerReset, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const WhatWeDoSection = () => {
  return (
    <>
    <section className="what-we-do-section">
      <div className="overlay">
        <h2 className="section-title">Transform Your Movement, Transform Your Life.</h2>
        <p className="section-subtitle">
        We combine cutting-edge training science with intuitive technology to deliver
        personalized, guided, and professional workouts —anywhere.
        
        </p>

        <div className="features-container">
          <div className="feature-card">
            <div className="icon-wrapper">
              <Dumbbell size={30} strokeWidth={1.5} />
            </div>
            <h3>Strength Training</h3>
            <p>Boost your endurance and build muscle with proven training plans.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <HeartPulse size={30} strokeWidth={1.5} />
            </div>
            <h3>Cardio Coaching</h3>
            <p>Burn fat and improve heart health with professional cardio workouts.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <TimerReset size={30} strokeWidth={1.5} />
            </div>
            <h3>Flexible Routines</h3>
            <p>Train on your own schedule with guided flexibility and mobility drills.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <UsersRound size={30} strokeWidth={1.5} />
            </div>
            <h3>Expert Mentors</h3>
            <p>Connect with certified trainers who guide you toward your goals.</p>
          </div>
        </div>
      </div>
    </section>
    <div className="hero-buttons">
    <Link to="/exercise" className="hero-btn primary-btn">Browse Exercises</Link>
    <Link to="/mentors" className="hero-btn secondary-btn">Find a Mentor</Link>
  </div>
  </>
  );
};

export default WhatWeDoSection;