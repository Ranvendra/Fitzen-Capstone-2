import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Dumbbell,
  Activity,
  Flame,
  Loader,
} from "lucide-react";

import Api from "../API/Api";
import Key from "../API/Key";

const ExercisePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [cache, setCache] = useState(new Map()); // Cache for API responses
  const videosPerPage = 9;

  const YOUTUBE_API_KEY = Key;
  const YOUTUBE_API_URL = Api;

  const categories = [
    { name: "Cardio", searchQuery: "cardio workout Exercise" },
    { name: "Yoga", searchQuery: "yoga workout morning flow" },
    { name: "Strength", searchQuery: "strength training workout gym" },
    { name: "Core", searchQuery: "core workout abs exercise" },
    { name: "Legs", searchQuery: "leg workout exercise training" },
    { name: "Flexibility", searchQuery: "flexibility stretching workout" },
    { name: "Pilates", searchQuery: "pilates workout exercise" },
    { name: "Dance", searchQuery: "dance workout fitness cardio" },
    { name: "Mental Wellness", searchQuery: "meditation mindfulness relaxation" },
    { name: "Functional", searchQuery: "functional training workout" },
    { name: "Recovery", searchQuery: "recovery stretching mobility workout" },
    { name: "Aqua", searchQuery: "water aerobics aqua fitness" }
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // Memoized utility functions
  const getDifficultyLevel = useCallback((duration, title, description) => {
    const durationMinutes = parseDuration(duration);
    const content = `${title} ${description}`.toLowerCase();
    
    if (content.includes('beginner') || content.includes('easy') || content.includes('basic')) {
      return 'Beginner';
    } else if (content.includes('advanced') || content.includes('expert') || content.includes('intense')) {
      return 'Advanced';
    } else if (durationMinutes > 45) {
      return 'Advanced';
    } else if (durationMinutes < 20) {
      return 'Beginner';
    } else {
      return 'Intermediate';
    }
  }, []);

  const parseDuration = useCallback((duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '') || 0;
    const minutes = (match[2] || '').replace('M', '') || 0;
    const seconds = (match[3] || '').replace('S', '') || 0;
    return parseInt(hours) * 60 + parseInt(minutes) + Math.round(parseInt(seconds) / 60);
  }, []);

  const formatDuration = useCallback((duration) => {
    const minutes = parseDuration(duration);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes} mins`;
  }, [parseDuration]);

  const formatViewCount = useCallback((viewCount) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }, []);

  const getCategoryFromContent = useCallback((title, description) => {
    const content = `${title} ${description}`.toLowerCase();
    
    for (const category of categories) {
      const keywords = category.searchQuery.toLowerCase().split(' ');
      if (keywords.some(keyword => content.includes(keyword))) {
        return category.name;
      }
    }
    return 'General Fitness';
  }, [categories]);

  const getInstructorName = useCallback((channelTitle) => {
    return channelTitle
      .replace(/fitness|workout|yoga|pilates|official/gi, '')
      .trim() || channelTitle;
  }, []);

  // Optimized fetch function with caching
  const fetchYouTubeVideos = useCallback(async (searchQuery = "workout fitness", maxResults = 25) => {
    // Check cache first
    const cacheKey = `${searchQuery}_${maxResults}`;
    if (cache.has(cacheKey)) {
      console.log('Using cached data for:', searchQuery);
      setExercises(cache.get(cacheKey));
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Search for videos with optimized parameters
      const searchResponse = await fetch(
        `${YOUTUBE_API_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${maxResults}&order=relevance&videoDuration=medium&videoDefinition=high&key=${YOUTUBE_API_KEY}`
      );

      if (!searchResponse.ok) {
        throw new Error(`YouTube API Error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        setExercises([]);
        return;
      }

      // Get video IDs for detailed information
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      
      // Fetch detailed video information
      const detailsResponse = await fetch(
        `${YOUTUBE_API_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );

      if (!detailsResponse.ok) {
        throw new Error(`YouTube API Error: ${detailsResponse.status}`);
      }

      const detailsData = await detailsResponse.json();

      // Transform YouTube data
      const exerciseVideos = detailsData.items.map((video) => {
        const snippet = video.snippet;
        const duration = video.contentDetails.duration;
        const statistics = video.statistics;
        
        return {
          id: video.id,
          title: snippet.title,
          category: getCategoryFromContent(snippet.title, snippet.description),
          difficulty: getDifficultyLevel(duration, snippet.title, snippet.description),
          duration: formatDuration(duration),
          participants: formatViewCount(statistics.viewCount || 0),
          thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default.url,
          instructor: getInstructorName(snippet.channelTitle),
          description: snippet.description.substring(0, 150) + (snippet.description.length > 150 ? '...' : ''),
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
          publishedAt: snippet.publishedAt,
          channelTitle: snippet.channelTitle,
          viewCount: statistics.viewCount || 0,
          likeCount: statistics.likeCount || 0
        };
      });

      // Cache the results
      setCache(prev => new Map(prev).set(cacheKey, exerciseVideos));
      setExercises(exerciseVideos);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cache, YOUTUBE_API_KEY, YOUTUBE_API_URL, getCategoryFromContent, getDifficultyLevel, formatDuration, formatViewCount, getInstructorName]);

  // Load initial videos only once
  useEffect(() => {
    if (!hasSearched) {
      fetchYouTubeVideos("workout fitness", 20);
      setHasSearched(true);
    }
  }, [fetchYouTubeVideos, hasSearched]);

  // Handle search with debouncing
  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    
    let searchQuery = "workout fitness";
    
    if (searchTerm.trim()) {
      searchQuery = searchTerm.trim();
    } else if (selectedCategory) {
      const categoryData = categories.find(cat => cat.name === selectedCategory);
      if (categoryData) {
        searchQuery = categoryData.searchQuery;
      }
    }
    
    fetchYouTubeVideos(searchQuery, 25);
  }, [searchTerm, selectedCategory, fetchYouTubeVideos, categories]);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    if (category) {
      const categoryData = categories.find(cat => cat.name === category);
      if (categoryData) {
        fetchYouTubeVideos(categoryData.searchQuery, 25);
      }
    }
  }, [fetchYouTubeVideos, categories]);

  // Memoized filtered exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = !searchTerm || (
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = !selectedCategory || exercise.category === selectedCategory;
      const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [exercises, searchTerm, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredExercises.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedExercises = filteredExercises.slice(startIndex, startIndex + videosPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleVideoClick = useCallback((videoUrl) => {
    window.open(videoUrl, '_blank');
  }, []);

  // Handle Enter key press in search input
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Show API key warning if not configured
  if (YOUTUBE_API_KEY === "YOUR_YOUTUBE_API_KEY_HERE") {
    return (
      <div className="exercise-page">
        <div className="api-key-warning">
          <div className="warning-content">
            <h2 className="warning-title">YouTube API Key Required</h2>
            <p className="warning-description">
              Please replace "YOUR_YOUTUBE_API_KEY_HERE" with your actual YouTube API key in the component to load exercise videos.
            </p>
            <div className="warning-steps">
              <h3>How to get your YouTube API key:</h3>
              <ol>
                <li>Go to Google Cloud Console</li>
                <li>Create a new project or select existing one</li>
                <li>Enable YouTube Data API v3</li>
                <li>Create credentials (API Key)</li>
                <li>Copy the API key and replace it in the code</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-page">
      {/* Hero Section */}
      <div className="exercise-hero-section">
        <div className="exercise-hero-overlay2"></div>
        <div className="exercise-hero-background-blur"></div>

        <div className="exercise-hero-content">
          <div className="exercise-hero-badge">
            <Dumbbell className="exercise-hero-badge-icon" />
            <span>Exercise Library</span>
          </div>

          <h1 className="exercise-hero-title">
            Transform Your Body & Mind
            <span className="exercise-hero-title-gradient">With Expert Workouts</span>
          </h1>

          <p className="exercise-hero-description">
            Discover hundreds of professionally crafted workout videos designed to strengthen your body, 
            calm your mind, and elevate your overall wellness journey.
          </p>

          <div className="exercise-hero-stats">
            <div className="exercise-stat-item">
              <div className="exercise-stat-number">500+</div>
              <div className="exercise-stat-label">Video Workouts</div>
            </div>
            <div className="exercise-stat-item">
              <div className="exercise-stat-number">50k</div>
              <div className="exercise-stat-label">Active Users</div>
            </div>
            <div className="exercise-stat-item">
              <div className="exercise-stat-number">{categories.length}</div>
              <div className="exercise-stat-label">Categories</div>
            </div>
          </div>
        </div>

        <div className="exercise-hero-bg-element-1"></div>
        <div className="exercise-hero-bg-element-2"></div>
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
            <div className="benefit-icon benefit-icon-blue">
              <Activity className="icon" />
            </div>
            <h3 className="benefit-title">Track Progress</h3>
            <p className="benefit-description">
              Monitor your fitness journey with detailed analytics and achievement tracking.
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
        </div>
      </div>

      {/* Search Section */}
      <div className="exercise-search-section">
        <div className="exercise-search-content">
          <div className="exercise-search-header">
            <h2 className="exercise-search-title">Find Your Perfect Workout</h2>
            <p className="exercise-search-description">
              Search through our extensive library of workouts by category, difficulty, or instructor.
            </p>
          </div>

          <div className="exercise-search-container">
            <div className="exercise-search-form">
              <div className="exercise-search-input-wrapper">
                <Search className="exercise-search-icon" />
                <input
                  type="text"
                  placeholder="Search workouts"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="exercise-search-input"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="exercise-filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="exercise-filter-select"
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              <button onClick={handleSearch} className="exercise-search-button">
                Search
              </button>
            </div>
          </div>

          
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="videos-section">
        {error && (
          <div className="error-message">
            <div className="error-content">
              <h3 className="error-title">Error Loading Videos</h3>
              <p className="error-description">{error}</p>
              <button onClick={handleSearch} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        )}

        <div className="exercise-results-info">
            <p>{`Showing ${paginatedExercises.length} of ${filteredExercises.length} workouts ->`}</p>
            {loading && (
              <div className="exercise-loading-indicator">
                <Loader className="exercise-loading-spinner" />
                <span>Loading workouts...</span>
              </div>
            )}
          </div>

        <div className="videos-grid">
          {paginatedExercises.map(exercise => (
            <div key={exercise.id} className="video-card">
              <div className="video-thumbnail">
                <img src={exercise.thumbnail} alt={exercise.title} className="thumbnail-image" />
                <div className="play-overlay" onClick={() => handleVideoClick(exercise.videoUrl)}>
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
                    <span>{exercise.participants} views</span>
                  </div>
                </div>

                <button 
                  className="watch-button"
                  onClick={() => handleVideoClick(exercise.videoUrl)}
                >
                  <Play className="watch-icon" />
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && !loading && !error && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search className="search-empty-icon" />
            </div>
            <h3 className="no-results-title">No workouts found</h3>
            <p className="no-results-description">
              Try adjusting your search criteria or browse different categories.
            </p>
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