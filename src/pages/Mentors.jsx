import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  Phone,
  Mail,
  Award,
  Users,
  Heart,
  Zap,
} from "lucide-react";
import "./Mentors.css";

const MentorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Yoga Therapy",
      image:
        "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      experience: "12 years",
      rating: 4.9,
      reviews: 342,
      description:
        "Certified yoga therapist specializing in stress management and mindfulness practices.",
      phone: "+1 (555) 123-4567",
      email: "sarah.chen@fitzen.com",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "Strength Training",
      image:
        "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=400&fit=crop&crop=face",
      experience: "8 years",
      rating: 4.8,
      reviews: 289,
      description:
        "Elite strength coach with expertise in functional movement and injury prevention on body.",
      phone: "+1 (555) 234-5678",
      email: "marcus.r@fitzen.com",
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Pilates",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      experience: "15 years",
      rating: 4.9,
      reviews: 456,
      description:
        "Master Pilates instructor focusing on core strength and postural alignment.",
      phone: "+1 (555) 345-6789",
      email: "emma.t@fitzen.com",
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Mental Wellness",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      experience: "10 years",
      rating: 4.7,
      reviews: 198,
      description:
        "Licensed therapist specializing in mindfulness-based stress reduction techniques.",
      phone: "+1 (555) 456-7890",
      email: "david.kim@fitzen.com",
    },
    {
      id: 5,
      name: "Lisa Zhang",
      specialty: "Nutrition",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      experience: "7 years",
      rating: 4.8,
      reviews: 267,
      description:
        "Registered dietitian focusing on sports nutrition and holistic wellness approaches, currently working in USA.",
      phone: "+1 (555) 567-8901",
      email: "lisa.zhang@fitzen.com",
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      specialty: "Cardio Training",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      experience: "9 years",
      rating: 4.6,
      reviews: 234,
      description:
        "HIIT specialist and former Olympic athlete with focus on cardiovascular conditioning.",
      phone: "+1 (555) 678-9012",
      email: "ahmed.h@fitzen.com",
    },
    {
      id: 7,
      name: "Maria Santos",
      specialty: "Flexibility Training",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      experience: "11 years",
      rating: 4.9,
      reviews: 378,
      description:
        "Former ballet dancer turned flexibility coach, specializing in mobility and range of body motion.",
      phone: "+1 (555) 789-0123",
      email: "maria.s@fitzen.com",
    },
    {
      id: 8,
      name: "Ryan O'Connor",
      specialty: "CrossFit",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      experience: "6 years",
      rating: 4.7,
      reviews: 156,
      description:
        "Level 3 CrossFit trainer focused on functional fitness and competitive athletics.",
      phone: "+1 (555) 890-1234",
      email: "ryan.o@fitzen.com",
    },
    {
      id: 9,
      name: "Dr. Priya Patel",
      specialty: "Sports Medicine",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      experience: "14 years",
      rating: 4.9,
      reviews: 423,
      description:
        "Sports medicine physician specializing in injury rehabilitation and prevention.",
      phone: "+1 (555) 901-2345",
      email: "priya.p@fitzen.com",
    },
    {
      id: 10,
      name: "Jake Williams",
      specialty: "Boxing",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
      experience: "13 years",
      rating: 4.8,
      reviews: 298,
      description:
        "Professional boxing coach with expertise in technique, conditioning, and mental toughness.",
      phone: "+1 (555) 012-3456",
      email: "jake.w@fitzen.com",
    },
    {
      id: 11,
      name: "Sophie Laurent",
      specialty: "Dance Fitness",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIn35evcRO37bPSwqSdBYMVuQhi2x3NIhCbA&s",
      experience: "8 years",
      rating: 4.7,
      reviews: 189,
      description:
        "Professional dancer and choreographer making fitness fun through dance-based workouts.",
      phone: "+1 (555) 123-4567",
      email: "sophie.l@fitzen.com",
    },
    {
      id: 12,
      name: "Michael Brooks",
      specialty: "Calisthenics",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
      experience: "10 years",
      rating: 4.8,
      reviews: 245,
      description:
        "Bodyweight training expert helping clients master advanced calisthenics movements.",
      phone: "+1 (555) 234-5678",
      email: "michael.b@fitzen.com",
    },
    {
      id: 13,
      name: "Anna Kowalski",
      specialty: "Meditation",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      experience: "16 years",
      rating: 4.9,
      reviews: 367,
      description:
        "Mindfulness meditation teacher with deep expertise in various practices like sharpening and relaxing Mind.",
      phone: "+1 (555) 345-6789",
      email: "anna.k@fitzen.com",
    },
    {
      id: 14,
      name: "Carlos Mendez",
      specialty: "Swimming",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      experience: "12 years",
      rating: 4.6,
      reviews: 178,
      description:
        "Former competitive swimmer specializing in technique refinement and endurance training.",
      phone: "+1 (555) 456-7890",
      email: "carlos.m@fitzen.com",
    },
    {
      id: 15,
      name: "Dr. Rachel Green",
      specialty: "Physical Therapy",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMD_R_TKnloC3O-Jb3kGVlYXHQ2UAoJqxZQ&s",
      experience: "18 years",
      rating: 4.9,
      reviews: 512,
      description:
        "Licensed physical therapist focusing on movement rehabilitation and pain management.",
      phone: "+1 (555) 567-8901",
      email: "rachel.g@fitzen.com",
    },
    {
      id: 16,
      name: "Tony Chang",
      specialty: "Martial Arts",
      image:
        "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face",
      experience: "20 years",
      rating: 4.8,
      reviews: 334,
      description:
        "Master martial artist teaching traditional forms, self-defense, and disciplined training.",
      phone: "+1 (555) 678-9012",
      email: "tony.c@fitzen.com",
    },
  ];

  const specialties = [...new Set(mentors.map((mentor) => mentor.specialty))];

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "" || mentor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  },[]);

  const handleSearch = () => {
    // Search is handled by the useMemo hook above
  };

  return (
    <div className="mentors-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-background-blur"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <Users className="hero-badge-icon" />
            <span>Expert Mentors</span>
          </div>

          <h1 className="hero-title">
            Meet Your
            <span className="hero-title-gradient">Fitness Mentors</span>
          </h1>

          <p className="hero-description">
            Transform your fitness journey with personalized guidance from
            world-class experts who understand that true wellness encompasses
            both physical strength and mental clarity.
          </p>
        </div>

        <div className="hero-bg-element-1"></div>
        <div className="hero-bg-element-2"></div>
      </div>


      {/* Search Section */}
      <div className="mentors-search-section">
        <div className="mentors-search-content">
          <div className="mentors-search-header">
            <h2 className="mentors-search-title">Find Your Perfect Mentor</h2>
            <p className="mentors-search-description">
              Search by name or specialty to discover the expert who aligns with
              your fitness goals.
            </p>
          </div>

          <div className="mentors-search-container">
            <div className="mentors-search-form">
              <div className="mentors-search-input-wrapper">
                <Search className="mentors-search-icon" />
                <input
                  type="text"
                  placeholder="Search by mentor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mentors-search-input"
                />
              </div>

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="mentors-specialty-select"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              <button onClick={handleSearch} className="mentors-search-button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="mentors-section">
        <div className="mentors-grid">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              
                <div className="mentor-avatar-section">
                  <div className="mentor-avatar-wrapper">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="mentor-avatar"
                    />
                    <div className="mentor-status-indicator"></div>
                  </div>
                </div>

                <div className="mentor-info">
                  <div className="mentor-header">
                    <div className="mentor-name-section">
                      <h3 className="mentor-name">{mentor.name}</h3>
                      <p className="mentor-specialty">{mentor.specialty}</p>
                    </div>
                    <div className="mentor-rating-section">
                      <div className="mentor-rating">
                        <Star className="star-icon" />
                        <span className="rating-value">{mentor.rating}</span>
                      </div>
                      <p className="reviews-count">
                        ({mentor.reviews} reviews)
                      </p>
                    </div>
                  </div>

                  <p className="mentor-description">{mentor.description}</p>

                  <div className="mentor-footer">
                    <div className="mentor-experience">
                      <span className="experience-value">
                        {mentor.experience}
                      </span>{" "}
                      experience
                    </div>

                    <div className="mentor-contact">
                      <a
                        href={`tel:${mentor.phone}`}
                        className="contact-button phone-button"
                      >
                        <Phone className="contact-icon" />
                      </a>
                      <a
                        href={`mailto:${mentor.email}`}
                        className="contact-button email-button"
                      >
                        <Mail className="contact-icon" />
                      </a>
                    </div>
                  </div>
                </div>
            
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search className="search-empty-icon" />
            </div>
            <h3 className="no-results-title">No mentors found</h3>
            <p className="no-results-description">
              Try adjusting your search criteria or browse all mentors.
            </p>
          </div>
        )}
      </div>

      {/* Success Stories Section */}
      <div className="success-stories-section">
        <div className="success-overlay"></div>
        <div className="success-content">
          <div className="success-header">
            <h2 className="success-title">
              Real Results from
              <span className="success-title-accent"> Real People</span>
            </h2>
            <p className="success-description">
              Join thousands who have transformed their lives through expert
              mentorship on Fitzen. Your success story could be next.
            </p>
          </div>

          

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Success Stories</div>
            </div>

            

            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Goal Achievement</div>
            </div>
          </div>

          <div className="success-cta">
            <button className="cta-button">{`Start Your Journey Today ->`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
