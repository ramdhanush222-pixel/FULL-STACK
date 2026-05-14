import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Database,
  MessageSquare,
  Play,
  Search
} from 'lucide-react';
import '../styles/AcademyLanding.css';

const statCards = [
  {
    title: 'SQL Quiz Questions',
    value: '11070+',
    icon: Database
  },
  {
    title: '8 Real Time Projects',
    value: '68 Assignments+',
    icon: Code2
  },
  {
    title: 'SQL Interview Questions',
    value: '3280+',
    icon: MessageSquare
  }
];

const defaultFeatures = [
  '40+ hours of Live zoom class.',
  '50+ hours of recorded videos.',
  '1000+ code snippets.',
  'Support for final capstone project.'
];

const courses = [
  {
    title: 'MySQL',
    badge: 'MySQL',
    theme: 'mysql',
    reverse: false,
    features: defaultFeatures
  },
  {
    title: 'Oracle',
    badge: 'ORACLE',
    theme: 'oracle',
    reverse: true,
    features: [...defaultFeatures, 'Oracle database hosting cloud options']
  },
  {
    title: 'PostgreSQL',
    badge: 'PostgreSQL',
    theme: 'postgresql',
    reverse: false,
    features: defaultFeatures
  },
  {
    title: 'Microsoft SQL Server',
    badge: 'MSSQL',
    theme: 'mssql',
    reverse: true,
    features: defaultFeatures
  }
];

const footerColumns = [
  {
    title: 'Courses',
    links: [
      'SQL Foundations',
      'Subscriptions',
      'Internship',
      'SQL Database Projects',
      'Online SQL Query Editor/Tool'
    ]
  },
  {
    title: 'About Us',
    links: [
      'About Us',
      'Terms & Conditions',
      'Privacy Policy',
      'Refund Policy',
      'MySQL Quiz Questions'
    ]
  },
  {
    title: 'Community',
    links: [
      'Sitemap',
      'Contact Us',
      'Testimonials',
      'SQL Training Intro',
      'PostgreSQL Interview Questions'
    ]
  }
];

const socialItems = ['f', 'in', 'x', 'sl'];

const Home = ({ isLoggedIn = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const primaryPath = isLoggedIn ? '/Explore' : '/login';
  const secondaryPath = isLoggedIn ? '/Specialists' : '/register';

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="academy-page">
      <header className="academy-nav-shell" id="hero">
        <div className="academy-nav">
          <Link to="/" className="academy-brand">
            <span className="academy-brand-mark">
              <Cloud size={22} strokeWidth={2.2} />
            </span>
            <span className="academy-brand-text">Tansy Academy</span>
          </Link>

          <nav className="academy-nav-links" aria-label="Landing navigation">
            <a href="#hero">Home</a>
            <a href="#courses">Courses</a>
            <a href="#specialist">Subscriptions</a>
            <a href="#query-tool">Preview</a>
            <a href="#overview">SQL Projects</a>
            <a href="#courses">Live Zoom Class</a>
          </nav>

          <div className="academy-nav-actions">
            <Link to={primaryPath} className="academy-link-button academy-link-plain">
              {isLoggedIn ? 'Dashboard' : 'Sign in'}
            </Link>
            <Link to={secondaryPath} className="academy-link-button academy-link-accent">
              {isLoggedIn ? 'Explore' : 'Sign up'}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="academy-hero-section">
          <div className="academy-hero-copy">
            <p className="academy-kicker">SQL and Power BI Online Training</p>
            <h1>
              Make learning <span>SQL</span> very simple
            </h1>
            <p className="academy-hero-description">
              Tansy Academy&apos;s live online SQL database training provides interactive,
              hands-on learning experiences led by experienced instructors.
            </p>

            <form className="academy-search-bar" onSubmit={handleSearchSubmit}>
              <label className="academy-search-field" htmlFor="course-search">
                <Search size={18} />
                <input
                  id="course-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Find the course you are looking for"
                />
              </label>
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="academy-hero-media">
            <div className="academy-video-frame">
              <div className="academy-video-topbar">
                <div className="academy-video-channel">Tansy Academy</div>
                <div className="academy-video-controls">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="academy-video-screen">
                <div className="academy-video-overlay" />
                <div className="academy-video-content">
                  <h2>Tansy Academy SQL Training Introduction</h2>
                  <p>Hands-on SQL database learning with live guidance, practice, and real projects.</p>
                  <button type="button" className="academy-play-button" aria-label="Play introduction">
                    <Play size={26} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-overview" id="overview">
          <h2>
            Discover the fundamentals of <strong>MySQL, Oracle, PostgreSQL &amp; Microsoft SQL Server</strong>
          </h2>
          <p>
            Our SQL boot camp offers an intensive, comprehensive curriculum designed to quickly equip
            participants with the skills needed to effectively manage and analyze databases using SQL.
          </p>

          <div className="academy-stat-grid">
            {statCards.map(({ title, value, icon: Icon }) => (
              <article key={title} className="academy-stat-card">
                <div className="academy-stat-icon">
                  <Icon size={46} />
                </div>
                <h3>{title}</h3>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="academy-specialist" id="specialist">
          <h2>
            Become a <strong>Data Specialist</strong>
          </h2>
          <p>
            Our online SQL query editor allows you to practice and enhance your SQL skills without the
            need for local database installations. With our web-based platform, you can easily write,
            execute, and test SQL queries, making it convenient to develop your SQL expertise from
            anywhere.
          </p>
        </section>

        <section className="academy-course-stack" id="courses">
          {filteredCourses.map((course) => (
            <article
              key={course.title}
              className={`academy-course-card ${course.reverse ? 'is-reversed' : ''}`}
            >
              <div className={`academy-course-art academy-theme-${course.theme}`}>
                <div className="academy-course-blob" />
                <div className="academy-course-badge">{course.badge}</div>
              </div>

              <div className="academy-course-copy">
                <h3>{course.title}</h3>
                <h4>Basic to advanced Training</h4>

                <ul>
                  {course.features.map((feature) => (
                    <li key={`${course.title}-${feature}`}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={secondaryPath} className="academy-enroll-button">
                  Get Enrolled
                </Link>
              </div>
            </article>
          ))}

          {!filteredCourses.length && (
            <div className="academy-empty-state">
              <p>No course matched that search yet. Try searching for MySQL, Oracle, PostgreSQL, or SQL Server.</p>
            </div>
          )}
        </section>

        <section className="academy-query-tool" id="query-tool">
          <h2>
            <strong>Test</strong> Your Code
          </h2>
          <p>
            Our web-based SQL Query Tool, conveniently accessible via your laptop or mobile device&apos;s
            browser, allows you to execute SQL statements and view the results immediately with a single click.
          </p>
          <span className="academy-query-count">1.5M Executions</span>

          <div className="academy-editor-card">
            <div className="academy-editor-window">
              <pre>{`SELECT * FROM org_client\n\nWHERE Country = 'USA';`}</pre>
            </div>
            <Link to={primaryPath} className="academy-query-button">
              Try it yourself
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="academy-footer">
        <div className="academy-footer-brand">
          <div className="academy-footer-logo">
            <Cloud size={32} strokeWidth={2.2} />
          </div>
          <p>Helping learners become confident SQL professionals through live online instruction.</p>
        </div>

        <div className="academy-footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title} className="academy-footer-column">
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a href="#hero" key={`${column.title}-${link}`}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="academy-footer-social">
          <h3>Follow Us</h3>
          <div className="academy-social-row">
            {socialItems.map((item) => (
              <a href="#hero" key={item} aria-label={`Follow on ${item}`}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="academy-footer-bottom">
          <p>&copy; 2024 Tansy Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
