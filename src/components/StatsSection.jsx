import React from 'react';
import './StatsSection.css';
import { Video, Users, Star, Calendar } from 'lucide-react';

const stats = [
  { icon: <Video size={28} />, count: '842', label: 'Exercises' },
  { icon: <Users size={28} />, count: '15.7k+', label: 'Active Users' },
  { icon: <Star size={28} />, count: '387.5k+', label: 'Workouts Done' },
  { icon: <Calendar size={28} />, count: '23', label: 'Upcoming Events' }
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon">{stat.icon}</div>
          <h2 className="stat-count">{stat.count}</h2>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;