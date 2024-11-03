import React, { useEffect, useRef } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AboutUsSection from "./AboutUsSection";
import ContactUsSection from "./ContactUsSection";
import WhatApp from "../../assets/logowtp.svg";

const MainContent = ({ onSectionChange }) => {
  const sectionRefs = useRef({
    home: null,
    features: null,
    about: null,
    contact: null,
  });

  useEffect(() => {
    const sections = [
      { id: "home", ref: sectionRefs.current.home },
      { id: "features", ref: sectionRefs.current.features },
      { id: "about", ref: sectionRefs.current.about },
      { id: "contact", ref: sectionRefs.current.contact },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const sectionId = visibleSection.target.getAttribute("id");
          onSectionChange(sectionId); // Call the prop to update Navbar state
        }
      },
      { threshold: 0.5 } // Adjust to trigger when half of the section is in view
    );

    sections.forEach((section) => {
      if (section.ref) {
        observer.observe(section.ref);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref) {
          observer.unobserve(section.ref);
        }
      });
    };
  }, [onSectionChange]);
  return (
    <>
      <section ref={(el) => (sectionRefs.current.home = el)} id="home-section">
        <HeroSection />
      </section>
      <section
        ref={(el) => (sectionRefs.current.features = el)}
        id="features-section"
      >
        <FeaturesSection />
      </section>
      <section
        ref={(el) => (sectionRefs.current.about = el)}
        id="about-us-section"
      >
        <AboutUsSection />
      </section>
      <section
        ref={(el) => (sectionRefs.current.contact = el)}
        id="contact-us-section"
      >
        <ContactUsSection />
      </section>
      <div
        style={{
          position: "fixed",
          bottom: "20px", // Adjust the vertical position
          right: "20px", // Adjust the horizontal position
          zIndex: 1000, // Ensure it's above other elements
        }}
      >
        <a
          href="https://api.whatsapp.com/send?phone=94702637919"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#25D366", // WhatsApp green color
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <img
            src={WhatApp}
            alt="WhatsApp"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%", // To make the icon rounded
            }}
          />
        </a>
      </div>
    </>
  );
};

export default MainContent;
