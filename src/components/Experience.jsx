import React from 'react';
import './Experience.css';

const coaches = [
  {
    name: 'Sarah Johnson',
    title: 'Strength Training Coach',
    description: 'With over 10 years of experience, Sarah specializes in strength training and functional fitness.',
    image: "https://cdn.prod.website-files.com/65b300512ced7cf5a4ad20ab/65c996d7c862b796c5d795fc_650ce25c8bfbb1780b3c1834_64f8408b18f85bb7386d8eb6_64c9ad493b1574f3356e1f9f_6476623d411555a3f5e94c37_644f288a7487d85de5fffeb7_644e83750aef4386a82d8229_644dce5860a3279285e59847_644abac98c1523222f67a33f_6449f4a3f0acdd3e43d19f23_64493e5c9b863f2d1ca34790_6445bca01c8ecc695f2a8cb9_6440313bfea1017ea062ccf8_643ff321accfe423a0bed2d7_643ee749b0eb63abeaf4417b_643d5e3c224c16028f868d91_643c87e5c96b4e76bac86e68_643c80be3b3ed2da0f6c7c83_643bed0970dd8aad60092bbb_643ab7230fae2cd6828d2b40_643996e71367c0099f4ea6e1_6434aa7a111f06098a94805d_Ana-de-Armas.jpeg",
  },
  {
    name: 'Michael Rodriguez',
    title: 'Cardio & HIIT Specialist',
    description: "Michael's high-energy workouts combine cardio and HIIT to maximize calorie burn and endurance.",
    image: 'https://wallpaperaccess.com/full/1329282.jpg', 
  },
  {
    name: 'Emma Williams',
    title: 'Yoga & Flexibility Coach',
    description: 'Emma guides clients through mindful movements to improve flexibility, balance, and inner peace.',
    image: 'https://wallpapers.com/images/hd/elizabeth-olsen-blonde-waves-ib76zzx1dpz9yr6q.jpg', // Replace with your own
  },
  {
    name: 'David Chen',
    title: 'Nutrition & Recovery Expert',
    description: 'David helps clients optimize their nutrition and recovery protocols for maximum results.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/chris-evans-gettyimages-1138769185.jpg',
  },
];

const Experience = () => {
  return (
    <section className="experience-section">
      {coaches.map((coach, index) => (
        <div className="coach-card" key={index}>
          <img src={coach.image} alt={coach.name} className="coach-image" />
          <div className="coach-info">
            <h3 className="coach-name">{coach.name}</h3>
            <p className="coach-title">{coach.title}</p>
            <p className="coach-description">{coach.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;