import React, { useState, useMemo } from "react";
import "./Exercise.css"
import {
  Search,
  Play,
  Clock,
  Users,
  Target,
  Zap,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight,
  Filter,
  Dumbbell,
  Activity,
  Flame,
} from "lucide-react";



const ExercisePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  const exercises = [
    {
      id: 1,
      title: "Full Body HIIT Workout",
      category: "Cardio",
      difficulty: "Intermediate",
      duration: "25 mins",
      participants: "2.3k",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      instructor: "Sarah Johnson",
      description: "High-intensity interval training for maximum calorie burn and strength building.",
      videoUrl: "https://example.com/video1"
    },
    {
      id: 2,
      title: "Morning Yoga Flow",
      category: "Yoga",
      difficulty: "Beginner",
      duration: "30 mins",
      participants: "1.8k",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      instructor: "Meditation Master",
      description: "Start your day with peaceful yoga movements and breathing exercises.",
      videoUrl: "https://example.com/video2"
    },
    {
      id: 3,
      title: "Upper Body Strength",
      category: "Strength",
      difficulty: "Advanced",
      duration: "40 mins",
      participants: "1.5k",
      thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
      instructor: "Mike Rodriguez",
      description: "Build powerful arms, chest, and back with progressive strength exercises.",
      videoUrl: "https://example.com/video3"
    },
    {
      id: 4,
      title: "Core Blast Challenge",
      category: "Core",
      difficulty: "Intermediate",
      duration: "20 mins",
      participants: "3.1k",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
      instructor: "Emma Chen",
      description: "Intense core workout targeting abs, obliques, and lower back stability.",
      videoUrl: "https://example.com/video4"
    },
    {
      id: 5,
      title: "Leg Day Power Session",
      category: "Legs",
      difficulty: "Advanced",
      duration: "45 mins",
      participants: "1.9k",
      thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=250&fit=crop",
      instructor: "David Kim",
      description: "Complete leg workout focusing on quads, hamstrings, glutes, and calves.",
      videoUrl: "https://example.com/video5"
    },
    {
      id: 6,
      title: "Flexibility & Stretching",
      category: "Flexibility",
      difficulty: "Beginner",
      duration: "15 mins",
      participants: "2.7k",
      thumbnail: "https://images.unsplash.com/photo-1506629905607-ce51d4d63ac8?w=400&h=250&fit=crop",
      instructor: "Lisa Zhang",
      description: "Improve flexibility and prevent injury with gentle stretching routines.",
      videoUrl: "https://example.com/video6"
    },
    {
      id: 7,
      title: "Boxing Fundamentals",
      category: "Cardio",
      difficulty: "Intermediate",
      duration: "35 mins",
      participants: "1.4k",
      thumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop",
      instructor: "Jake Williams",
      description: "Learn proper boxing techniques while getting an amazing cardio workout.",
      videoUrl: "https://example.com/video7"
    },
    {
      id: 8,
      title: "Pilates Core Flow",
      category: "Pilates",
      difficulty: "Intermediate",
      duration: "28 mins",
      participants: "2.2k",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop",
      instructor: "Anna Martinez",
      description: "Pilates-based movements for core strength and body alignment.",
      videoUrl: "https://example.com/video8"
    },
    {
      id: 9,
      title: "Dance Cardio Party",
      category: "Dance",
      difficulty: "Beginner",
      duration: "30 mins",
      participants: "4.2k",
      thumbnail: "https://images.unsplash.com/photo-1594736797933-d0cccf7b79b4?w=400&h=250&fit=crop",
      instructor: "Sophie Laurent",
      description: "Fun dance moves that burn calories and boost your mood.",
      videoUrl: "https://example.com/video9"
    },
    {
      id: 10,
      title: "Meditation & Mindfulness",
      category: "Mental Wellness",
      difficulty: "Beginner",
      duration: "20 mins",
      participants: "3.8k",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      instructor: "Dr. Rachel Green",
      description: "Guided meditation for stress relief and mental clarity.",
      videoUrl: "https://example.com/video10"
    },
    {
      id: 11,
      title: "Functional Movement",
      category: "Functional",
      difficulty: "Intermediate",
      duration: "35 mins",
      participants: "1.6k",
      thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=250&fit=crop",
      instructor: "Carlos Mendez",
      description: "Improve daily movement patterns with functional exercise training.",
      videoUrl: "https://example.com/video11"
    },
    {
      id: 12,
      title: "Power Yoga Flow",
      category: "Yoga",
      difficulty: "Advanced",
      duration: "50 mins",
      participants: "1.3k",
      thumbnail: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=250&fit=crop",
      instructor: "Maria Santos",
      description: "Dynamic yoga sequences that build strength and flexibility.",
      videoUrl: "https://example.com/video12"
    },
    {
      id: 13,
      title: "Beginner's Gym Guide",
      category: "Strength",
      difficulty: "Beginner",
      duration: "25 mins",
      participants: "5.1k",
      thumbnail: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?w=400&h=250&fit=crop",
      instructor: "Tony Chang",
      description: "Complete guide to gym equipment and basic strength training.",
      videoUrl: "https://example.com/video13"
    },
    {
      id: 14,
      title: "Recovery & Mobility",
      category: "Recovery",
      difficulty: "Beginner",
      duration: "18 mins",
      participants: "2.9k",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      instructor: "Dr. Priya Patel",
      description: "Essential recovery techniques and mobility exercises.",
      videoUrl: "https://example.com/video14"
    },
    {
      id: 15,
      title: "Kettlebell Workout",
      category: "Strength",
      difficulty: "Intermediate",
      duration: "30 mins",
      participants: "1.7k",
      thumbnail: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=250&fit=crop",
      instructor: "Ryan O'Connor",
      description: "Full-body kettlebell routine for strength and conditioning.",
      videoUrl: "https://example.com/video15"
    },
    {
      id: 16,
      title: "Aqua Fitness",
      category: "Aqua",
      difficulty: "Beginner",
      duration: "40 mins",
      participants: "1.2k",
      thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop",
      instructor: "Ahmed Hassan",
      description: "Low-impact water exercises perfect for all fitness levels.",
      videoUrl: "https://example.com/video16"
    }
  ];

  const categories = [...new Set(exercises.map(exercise => exercise.category))];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = 
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || exercise.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "" || exercise.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredExercises.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedExercises = filteredExercises.slice(startIndex, startIndex + videosPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDifficulty("");
    setCurrentPage(1);
  };

  return (
    <div className="exercise-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay2"></div>
        <div className="hero-background-blur"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <Dumbbell className="hero-badge-icon" />
            <span>Exercise Library</span>
          </div>

          <h1 className="hero-title">
            Transform Your Body & Mind
            <span className="hero-title-gradient">With Expert Workouts</span>
          </h1>

          <p className="hero-description">
            Discover hundreds of professionally crafted workout videos designed to strengthen your body, 
            calm your mind, and elevate your overall wellness journey.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number1">500+</div>
              <div className="stat-label1">Video Workouts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number1">50k+</div>
              <div className="stat-label1">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number1">15</div>
              <div className="stat-label1">Categories</div>
            </div>
          </div>
        </div>

        <div className="hero-bg-element-1"></div>
        <div className="hero-bg-element-2"></div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-orange">
              <Flame className="icon" />
            </div>
            <h3 className="benefit-title">Burn Calories</h3>
            <p className="benefit-description">
              High-intensity workouts designed to maximize calorie burn and boost your metabolism.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-green">
              <Heart className="icon" />
            </div>
            <h3 className="benefit-title">Mental Wellness</h3>
            <p className="benefit-description">
              Combine physical exercise with mindfulness practices for complete wellness.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-blue">
              <Activity className="icon" />
            </div>
            <h3 className="benefit-title">Track Progress</h3>
            <p className="benefit-description">
              Monitor your fitness journey with detailed analytics and achievement tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-content">
          <div className="search-header">
            <h2 className="search-title">Find Your Perfect Workout</h2>
            <p className="search-description">
              Search through our extensive library of workouts by category, difficulty, or instructor.
            </p>
          </div>

          <div className="search-container">
            <div className="search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search workouts, categories, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              <button onClick={clearFilters} className="clear-button">
                <Filter className="filter-icon" />
                Clear
              </button>
            </div>
          </div>

          <div className="results-info">
            <p>Showing {paginatedExercises.length} of {filteredExercises.length} workouts</p>
          </div>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="videos-section">
        <div className="videos-grid">
          {paginatedExercises.map(exercise => (
            <div key={exercise.id} className="video-card">
              <div className="video-thumbnail">
                <img src={exercise.thumbnail} alt={exercise.title} />
                <div className="play-overlay">
                  <Play className="play-icon" />
                </div>
                <div className="difficulty-badge" data-difficulty={exercise.difficulty.toLowerCase()}>
                  {exercise.difficulty}
                </div>
              </div>

              <div className="video-content">
                <div className="video-header">
                  <h3 className="video-title">{exercise.title}</h3>
                  <span className="video-category">{exercise.category}</span>
                </div>

                <p className="video-description">{exercise.description}</p>

                <div className="video-instructor">
                  <span>By {exercise.instructor}</span>
                </div>

                <div className="video-stats">
                  <div className="stat">
                    <Clock className="stat-icon" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="stat">
                    <Users className="stat-icon" />
                    <span>{exercise.participants}</span>
                  </div>
                </div>

                <button className="watch-button">
                  <Play className="watch-icon" />
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search className="search-empty-icon" />
            </div>
            <h3 className="no-results-title">No workouts found</h3>
            <p className="no-results-description">
              Try adjusting your search criteria or browse all workouts.
            </p>
            <button onClick={clearFilters} className="reset-button">
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <ChevronLeft className="pagination-icon" />
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
              <ChevronRight className="pagination-icon" />
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <div className="cta-header">
            <h2 className="cta-title">
              Ready to Start Your
              <span className="cta-title-accent"> Fitness Journey?</span>
            </h2>
            <p className="cta-description">
              Join thousands of people who have already transformed their lives through Fitzen. 
              Your body and mind will thank you.
            </p>
          </div>

          <div className="cta-features">
            <div className="feature-item">
              <Target className="feature-icon" />
              <span>Personalized Workouts</span>
            </div>
            <div className="feature-item">
              <Award className="feature-icon" />
              <span>Expert Guidance</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Quick Results</span>
            </div>
          </div>

          <div className="cta-actions">
            <button className="primary-cta-button">
              Start Free Trial →
            </button>
            <button className="secondary-cta-button">
              Browse All Workouts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;