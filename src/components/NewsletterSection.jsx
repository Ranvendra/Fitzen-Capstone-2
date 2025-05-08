import React from "react";
import "./NewsletterSection.css";
import { Send, Star } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        {/* Left Section */}
        <div className="newsletter-left">
          <h4 className="newsletter-tag">STAY UPDATED</h4>
          <h2 className="newsletter-title">Join Our Fitness Newsletter</h2>
          <p className="newsletter-desc">
            Get weekly workout tips, nutrition advice, and exclusive offers directly to your inbox.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-button">
              Subscribe <Send size={16} style={{ marginLeft: "8px" }} />
            </button>
          </div>
          <p className="newsletter-privacy">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>

        {/* Right Section */}
        <div className="newsletter-right">
          <h2 className="subscriber-count">10K+</h2>
          <p className="subscriber-label">Satisfied Subscribers</p>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#FFD700" color="#FFD700" strokeWidth={1.2} />
            ))}
          </div>
          <p className="rating-info">Average 4.9/5 satisfaction rating</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;