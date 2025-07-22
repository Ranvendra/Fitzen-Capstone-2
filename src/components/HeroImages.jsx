import React from 'react';
import './HeroImages.css';
import img1 from '../assets/image1.WebP';
import img2 from '../assets/image2.WebP';
import img3 from '../assets/yogaImg.WebP';
import img4 from '../assets/image4.WebP';
import { Link } from 'react-router-dom';

const HeroImages = () => {
  return (
    <div>
      <section className="image-stack">
        <div className="image-block" style={{ backgroundImage: `url(${img1})` }}></div>
        <div className="image-block" style={{ backgroundImage: `url(${img2})` }}></div>
        <div className="image-block" style={{ backgroundImage: `url(${img3})` }}></div>
        <div className="image-block" style={{ backgroundImage: `url(${img4})` }}></div>
      </section>

      {/* <div className="hero-buttons">
        <Link to="/exercise" className="hero-btn primary-btn">Browse Exercises</Link>
        <Link to="/mentors" className="hero-btn secondary-btn">Find a Mentor</Link>
      </div> */}
    </div>
  );
};

export default HeroImages;