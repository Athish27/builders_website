import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpeg";

function App() {
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true); // Trigger fade-in after the image changes
      }, 800); // Delay matches the fade-out duration
    }, 3000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const target = descriptionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add("fade-in");
        }
      },
      { threshold: 0.5 } // Trigger when 10% of the element is visible
    );

    if (target) {
      observer.observe(target);
    }

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      if (target) observer.unobserve(target); // Use the stored ref value for cleanup
    };
  }, []);

  useEffect(() => {
    const formtarget = formRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          formtarget.classList.add("fade-in");
        }
      },
      { threshold: 0.5 } // Trigger when 10% of the element is visible
    );

    if (formtarget) {
      observer.observe(formtarget);
    }

    return () => {
      if (formtarget) observer.unobserve(formtarget); // Use the stored ref value for cleanup
    };
  }, []);

  const handleContactClick = () => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1500); // Highlight for 2 seconds
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutUsClick = () => {
    
    const element = descriptionRef.current;
    const offset = window.innerHeight / 2 - element.offsetHeight / 2;

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });

      // Trigger the highlight effect
      setHighlight(true);

      // Remove the highlight after 1 second
      setTimeout(() => {
      setHighlight(false);
    }, 1000);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1 className="title">SRE SHANTHI BUILDERS</h1>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <button className="contact-button" onClick={handleAboutUsClick}>
                About Us
              </button>
            </li>
            <li>
              <button className="contact-button" onClick={handleProjectsClick}>
                Projects
              </button>
            </li>
            <li>
              <button className="contact-button" onClick={handleContactClick}>
                Contact Us
              </button>
            </li>

          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="quote-container">
          <h2 className="quote-left">"We Build</h2>
        </div>
        <div className="polaroid-container">
          <div className="polaroid-frame">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`slideshow-image ${fadeIn ? "fade-in" : "fade-out"}`}
            />
          </div>
        </div>
        <div className="quote-container">
          <h2 className="quote-right">Your Dreams"</h2>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="projects-section fade-scroll">
        <h2>Our Projects</h2>
        <p>Here we showcase our completed and ongoing projects...</p>
        {/* You can insert images, cards, or a gallery here */}
      </section>

      {/* Description Section */}
      <section id="about-us" className={`description ${highlight ? "highlight" : ""}`} ref={descriptionRef}>
        <p>
          Sre Shanthi Builders is a leading real estate and property development
          company based in Erode, established in 2009 with a commitment to
          delivering exceptional quality construction and superior workmanship.
          Over the years, we have earned a reputation for providing premium
          homes that blend modern design with affordable pricing, all while
          adhering to the highest quality standards.
        </p>
        <p>
          We specialize in designing and constructing homes that prioritize
          customer satisfaction, creating spaces that foster happiness, comfort,
          and modern living. Our dedication to superior quality and on-time
          delivery ensures that we exceed expectations within your budget.
        </p>
      </section>
      

      {/* Form Section */}
      <section id="form-section" className="form-section fade-scroll" ref={formRef}>
        <h2>Get In Touch</h2>
        <form className="user-form">

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID (Optional):</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="Land Area">Land Area (sq.ft):</label>
            <input type="number" id="Land Area" name="Area" placeholder="Enter your land area" min="0"
              required
              onKeyPress={(e) => e.key === "-" && e.preventDefault()} // Prevent typing "-"
              onInput={(e) => e.target.value < 0 && (e.target.value = "")} // Clear if negative value entered
              inputMode="numeric" // Better for mobile input
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget (in Lakhs):</label>
            <input type="number" id="budget" name="budget" placeholder="Enter your budget" min="0"
              required
              onKeyPress={(e) => e.key === "-" && e.preventDefault()} // Prevent typing "-"
              onInput={(e) => e.target.value < 0 && (e.target.value = "")} // Clear if negative value entered
              inputMode="numeric" // Better for mobile input
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className={`footer ${highlight ? "highlight" : ""}`} id="contact">
        <p>+91 9843396009 | +91 7589395009</p>
        <p>sreshanthibuilders@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;