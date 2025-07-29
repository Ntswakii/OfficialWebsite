import React, { useState, useEffect } from 'react';
import styles from './Components/LandingPage.Module.css';
import { useInView } from 'react-intersection-observer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo} aria-label="Olyxee Home">Olyxee</a>
        <ul className={styles.navLinks}>
          <li><a href="#features" aria-label="View Features">Features</a></li>
          <li><a href="#how-it-works" aria-label="How It Works">How It Works</a></li>
          <li><a href="#download" aria-label="Download Olyxee">Download</a></li>
          <li><a href="#about" aria-label="About Olyxee">About</a></li>
        </ul>
        <a href="#download" className={styles.ctaNav} aria-label="Get Started with Olyxee">Get Started</a>
        <button
          className={styles.mobileMenuToggle}
          aria-label="Toggle Mobile Menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
        <a href="#features" aria-label="View Features">Features</a>
        <a href="#how-it-works" aria-label="How It Works">How It Works</a>
        <a href="#download" aria-label="Download Olyxee">Download</a>
        <a href="#about" aria-label="About Olyxee">About</a>
        <a href="#download" className={styles.ctaNav} aria-label="Get Started with Olyxee">Get Started</a>
      </div>
    </header>
  );
};

const PlatformCard = ({ type, icon, title, description, buttonText, onClick }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div
      ref={ref}
      className={`${styles.platformCard} ${styles[type]} ${inView ? styles.separated : styles.merged}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`${styles.platformIcon} ${styles[type]}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#" className={`${styles.downloadBtn} ${styles[type]}`} aria-label={`Download Olyxee for ${title}`}>
        ⬇ {buttonText}
      </a>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div
      ref={ref}
      className={`${styles.featureCard} ${inView ? styles.visible : ''}`}
      style={{ '--delay': `${delay}s` }}
    >
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div ref={ref} className={`${styles.step} ${inView ? styles.visible : ''}`}>
      <div className={styles.stepNumber}>{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const App = () => {
  const platformCards = [
    {
      type: 'android',
      icon: '📱',
      title: 'Android',
      description: 'Get it on Google Play',
      buttonText: 'Download'
    },
    {
      type: 'smartdevice',
      icon: '🖥️',
      title: 'Watch',
      description: 'Try the web version',
      buttonText: 'Launch App'
    },
    {
      type: 'ios',
      icon: '🍎',
      title: 'iOS',
      description: 'Download on App Store',
      buttonText: 'Download'
    }
  ];

  const features = [
    {
      icon: '🧠',
      title: 'Emotional Intelligence',
      description: 'Olyxee understands your mood and emotional state, adapting its responses to provide the support you need each morning.',
      delay: 0
    },
    {
      icon: '⚡',
      title: 'Personalized Insights',
      description: 'Receive tailored recommendations and insights based on your daily routines and preferences.',
      delay: 0.2
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Olyxee helps plan your day with intelligent scheduling to maximize productivity and balance.',
      delay: 0.4
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Wake Up & Connect',
      description: 'Open Olyxee when you wake up. The AI greets you and assesses your current mood and energy level.'
    },
    {
      number: 2,
      title: 'Personalize Your Day',
      description: 'Receive customized suggestions for activities, tasks, or relaxation based on your mood.'
    },
    {
      number: 3,
      title: 'Stay on Track',
      description: 'Olyxee keeps you focused with gentle reminders and motivational nudges throughout the day.'
    }
  ];

  return (
    <div className="font-inter min-h-screen bg-white text-gray-900">
      <Header />
      <section className={styles.hero} id="hero">
        <div className={styles.heroContent}>
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-gray-800 animate-fadeInUp">Meet Olyxee</h1>
          <p className={`${styles.heroSubtitle} animate-fadeInUp`}>Your emotionally aware morning assistant...</p>
          <div className={styles.platformsContainer}>
            {platformCards.map(card => (
              <PlatformCard
                key={card.type}
                {...card}
                onClick={() => window.location.href = `#${card.type}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.features} id="features">
        <h2 className={`${styles.sectionTitle} fade-in-up`}>Powerful AI Features</h2>
        <p className={`${styles.sectionSubtitle} fade-in-up`}>Experience the future of personal assistance...</p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.2} />
          ))}
        </div>
      </section>
      <section className={styles.howItWorks} id="how-it-works">
        <h2 className={`${styles.sectionTitle} fade-in-up`}>How Olyxee Works</h2>
        <p className={`${styles.sectionSubtitle} fade-in-up`}>Start your day right with these simple steps</p>
        <div className={styles.steps}>
          {steps.map(step => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </section>
      <section className={styles.finalCta} id="download">
        <div className={`${styles.ctaContent} fade-in-up`}>
          <h2 className={styles.sectionTitle}>Ready to Transform Your Mornings?</h2>
          <p className={styles.sectionSubtitle}>Join thousands who are already starting their days...</p>
          <div className={styles.ctaButtons}>
            <a href="#" className={styles.btnWhite} aria-label="Download Olyxee Now">Download Now</a>
            <a href="#" className={styles.btnOutline} aria-label="Try Olyxee Web Version">Try Web Version</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;