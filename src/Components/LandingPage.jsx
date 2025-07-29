import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './LandingPage.module.css';

import { FaAndroid, FaApple, FaDesktop, FaBrain, FaComments, FaChartBar, FaSun, FaLink, FaBullseye, FaDownload } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

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
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
        rootMargin: '0px 0px -50px 0px',
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
                <FaDownload style={{ marginRight: 8 }} /> {buttonText}
            </a>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => {
    const { ref, inView } = useInView({
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
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
        rootMargin: '0px 0px -50px 0px',
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
            icon: <FaAndroid size={40} color="#4caf50" />,
            title: 'Android',
            description: 'Get it on Google Play',
            buttonText: 'Download',
        },
        {
            type: 'desktop',
            icon: <FaDesktop size={40} color="#667eea" />,
            title: 'Desktop',
            description: 'Try the web version',
            buttonText: 'Launch App',
        },
        {
            type: 'ios',
            icon: <FaApple size={40} color="#000000" />,
            title: 'iOS',
            description: 'Download on App Store',
            buttonText: 'Download',
        },
    ];

    const features = [
        {
            icon: <FaBrain size={36} color="white" />,
            title: 'Emotional Intelligence',
            description: 'Olyxee understands your mood and emotional state, adapting its responses to provide the support you need each morning.',
            delay: 0,
        },
        {
            icon: <FaComments size={36} color="white" />,
            title: 'Natural Conversations',
            description: 'Have meaningful conversations with your AI assistant that remembers context and builds understanding over time.',
            delay: 0.2,
        },
        {
            icon: <FaChartBar size={36} color="white" />,
            title: 'Life Summarization',
            description: 'Get intelligent summaries of your schedule, priorities, and important updates to start each day with clarity and focus.',
            delay: 0.4,
        },
        {
            icon: <FaSun size={36} color="white" />,
            title: 'Morning Optimization',
            description: 'Personalized morning routines and insights that help you begin each day feeling prepared and motivated.',
            delay: 0.6,
        },
        {
            icon: <FaLink size={36} color="white" />,
            title: 'Smart Integration',
            description: 'Seamlessly connects with your calendar, tasks, and apps to provide comprehensive life management.',
            delay: 0.8,
        },
        {
            icon: <FaBullseye size={36} color="white" />,
            title: 'Goal Tracking',
            description: 'Track your progress on personal and professional goals with intelligent insights and motivation.',
            delay: 1.0,
        },
    ];

    const steps = [
        {
            number: 1,
            title: 'Wake Up & Connect',
            description: 'Open Olyxee when you wake up. The AI greets you and assesses your current mood and energy level.',
        },
        {
            number: 2,
            title: 'Life Summary',
            description: 'Get a personalized summary of your day ahead, important tasks, and relevant updates from your connected apps.',
        },
        {
            number: 3,
            title: 'Emotional Check-in',
            description: 'Share how you\'re feeling and receive tailored advice, motivation, or relaxation techniques based on your emotional state.',
        },
        {
            number: 4,
            title: 'Start Your Day',
            description: 'Begin your day with clarity, focus, and the right mindset thanks to your emotionally intelligent morning companion.',
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <section className={styles.hero} id="hero">
                <div className={styles.heroContent}>
                    <h1 className="text-4xl md:text-6xl font-black mb-8 text-gray-800 animate-[fadeInUp_1s_ease-out]">Meet Olyxee</h1>
                    <p className={`${styles.heroSubtitle} animate-[fadeInUp_1s_ease-out_0.2s]`}>
                        Your emotionally aware morning assistant. It talks to you, summarizes your life, and helps you start your day with clarity.
                    </p>
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
                <p className={`${styles.sectionSubtitle} fade-in-up`}>Experience the future of personal assistance with emotional intelligence</p>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} {...feature} delay={index * 0.2} />
                    ))}
                </div>
                <div className="flex justify-center mt-16">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-white/40 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-[pulse_1.5s_ease-in-out_infinite_0.2s]"></div>
                        <div className="w-3 h-3 bg-white/40 rounded-full animate-[pulse_1.5s_ease-in-out_infinite_0.4s]"></div>
                    </div>
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
                    <p className={styles.sectionSubtitle}>Join thousands who are already starting their days with emotional clarity and intelligent insights.</p>
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
