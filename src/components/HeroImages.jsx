import React from 'react';
import './HeroImages.css';
import img1 from '../assets/image1.avif';
import img2 from '../assets/image2.avif';
import img3 from '../assets/image4j.avif';
import img4 from '../assets/image4.avif';
import { Link } from 'react-router-dom';

const HeroImages = () => {
  return (
    <div>
      <section className="image-stack">
        <div className="image-block" style={{ backgroundImage: `url(${img1})` }}></div>
        <div className="image-block" style={{ backgroundImage: `url(${img2})` }}></div>
        <div className="image-block" style={{ backgroundImage: `url(https://media.istockphoto.com/id/494726550/photo/man-doing-some-yoga-in-a-studio.jpg?s=612x612&w=0&k=20&c=vLlkG3OsYJH6sd287-asY_pwpMLzstAqUWhR-gO7eFU=)` }}></div>
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