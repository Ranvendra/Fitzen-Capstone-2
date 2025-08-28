import React from 'react';
import './HeroImages.css';

import img from '../assets/main.png';

import { Link } from 'react-router-dom';

const HeroImages = () => {
  return (
    <div>
      <section className="image-stack">
        <div className="image-block" style={{ backgroundImage: `url(${img})` }}></div>

      </section>

      {/* <div className="hero-buttons">
        <Link to="/exercise" className="hero-btn primary-btn">Browse Exercises</Link>
        <Link to="/mentors" className="hero-btn secondary-btn">Find a Mentor</Link>
      </div> */}
    </div>
  );
};

export default HeroImages;