import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edward-minghao-wu/' },
  { label: 'GitHub', href: 'https://github.com/ewu47' },
  { label: 'Resume', href: 'https://resume.eddiemwu.com' },
  { label: 'Contact', href: '#contact' },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreavjkr'

const codingLanguages = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
]

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
  status?: string
  deepDive: {
    overview: string
    highlights: string[]
    impact: string
    links: { label: string; href: string }[]
  }
}

const projects: Project[] = [
  {
    title: 'Fire CV (NexHacks 2nd Place Winner)',
    description: '3D fire safety navigation system — 2nd place out of 100+ teams at Nexhacks.',
    tags: ['Three.js', 'React Three Fiber', 'TypeScript', 'Azure OpenAI'],
    link: 'https://devpost.com/software/fire-cv?ref_content=my-projects-tab&ref_feature=my_projects',
    deepDive: {
      overview: 'Built an emergency navigation prototype that visualizes fire spread in 3D and suggests safer evacuation paths in real time.',
      highlights: [
        'Combined simulation + UI to make hazard zones intuitive under time pressure',
        'Integrated Azure OpenAI to explain route choices in plain language',
        'Designed for demo usability with rapid scene loading and clear path overlays',
      ],
      impact: 'Won 2nd place among 100+ teams and validated the concept with hackathon judges focused on practical impact.',
      links: [{ label: 'Devpost', href: 'https://devpost.com/software/fire-cv?ref_content=my-projects-tab&ref_feature=my_projects' }],
    },
  },
  {
    title: 'Divvy Data Analysis',
    description: 'Interactive visualization of 5M+ Chicago bike trip records with full ETL pipeline.',
    tags: ['PostgreSQL', 'React', 'TypeScript', 'Tableau'],
    link: 'https://ewu47.github.io/Wu-Viz/',
    deepDive: {
      overview: 'End-to-end analytics project processing a large urban mobility dataset and surfacing trends through interactive visual exploration.',
      highlights: [
        'Built ETL workflows to clean, transform, and aggregate 5M+ rows',
        'Structured metrics for seasonal usage, station popularity, and route behavior',
        'Shipped a public-facing visualization experience for fast pattern discovery',
      ],
      impact: 'Turned raw trip data into practical transportation insights while demonstrating full-stack data engineering + analytics execution.',
      links: [{ label: 'Live Visualization', href: 'https://ewu47.github.io/Wu-Viz/' }],
    },
  },
  {
    title: 'UChicago Sports Analytics Site',
    description: 'Official organization website, solely developed and deployed on Vercel.',
    tags: ['TypeScript', 'React', 'Vercel'],
    link: 'https://www.uchicagosportsanalytics.com',
    deepDive: {
      overview: 'Designed and shipped the official web presence for the organization, handling both frontend implementation and deployment.',
      highlights: [
        'Owned design-to-production execution as the sole developer',
        'Set up maintainable TypeScript React structure for future contributors',
        'Deployed and monitored on Vercel for reliable updates',
      ],
      impact: 'Provided a polished central hub for recruiting, events, and club visibility with an easy-to-maintain codebase.',
      links: [{ label: 'Live Site', href: 'https://www.uchicagosportsanalytics.com' }],
    },
  },
  {
    title: 'maketwentyfour',
    description: 'Multiplayer game of "Make 24"',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'Coming Soon',
    deepDive: {
      overview: 'A realtime multiplayer math game where players race to form 24 using arithmetic from shared card sets.',
      highlights: [
        'Realtime match state synchronization planned with Supabase',
        'Lightweight game loop focused on speed, fairness, and replayability',
        'Clear UX for quick onboarding and competitive rounds',
      ],
      impact: 'Targets a fun, social way to practice arithmetic while showcasing multiplayer product engineering.',
      links: [],
    },
  },
  {
    title: 'Pulse',
    description: 'Interactive App and website blocker with social study sessions',
    tags: ['React', 'TypeScript'],
    status: 'Coming Soon',
    deepDive: {
      overview: 'Productivity companion that blocks distractions while adding social accountability through live study sessions.',
      highlights: [
        'Focus-mode controls for app and site blocking',
        'Shared sessions for peer accountability and momentum',
        'Planned progress tracking to reinforce healthy habits',
      ],
      impact: 'Aims to increase deep-work consistency for students through behavior design plus lightweight social features.',
      links: [],
    },
  },
]

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!selectedProject) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedProject])

  useEffect(() => {
    if (contactStatus !== 'success') {
      return
    }

    const resetTimer = window.setTimeout(() => {
      setContactStatus('idle')
    }, 4500)

    return () => {
      window.clearTimeout(resetTimer)
    }
  }, [contactStatus])

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactStatus('sending')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (response.ok) {
        form.reset()
        setContactStatus('success')
      } else {
        setContactStatus('error')
      }
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <main className="container">
      <section className="hero">
        <div className="hero-photo">
          <img src="/assets/profile_photo.jpeg" alt="Edward Wu" />
        </div>
        <div className="hero-text">
          <h1>Edward Wu</h1>
          <p className="subtitle">
            CS &amp; Statistics @ UChicago &middot; NCAA D3 Soccer
          </p>
          <p className="bio">
            Hello there! I'm Edward <strong>(Eddie)</strong> Wu, a 2nd year sophomore studying CS (spec. leaning towards ML) and Statistics at UChicago. 
          </p>
          <p className="bio">
            I'm currently interested in the SWE and startup space (still figuring out specifically what I like), and also anything to do with sports ML + analytics.
          </p>
          <p className="bio"> 
            I'm from Cary, NC!
          </p>
          <nav className="nav-links">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.label}
                {l.href.startsWith('http') && <span className="arrow">{' ↗'}</span>}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section" id="education">
        <h2>Education</h2>
        <div className="experience-list">
          <div className="experience-item">
            <div className="exp-header">
              <h3 className="education-school">The University of Chicago</h3>
              <span className="exp-date">Sep 2024 — Jun 2028</span>
            </div>
            <p className="exp-role">B.S. Computer Science, B.A. Statistics — GPA: 3.56/4.00</p>
            <p className="coursework-label">Selected Coursework</p>
            <ul className="coursework-grid">
              <li>Introduction to Computer Science I &amp; II</li>
              <li>Systems Programming I &amp; II</li>
              <li>Theory of Algorithms</li>
              <li>Intro to Database Systems</li>
              <li>Discrete Mathematics</li>
              <li>Applied Regression Analysis</li>
              <li>Numerical Linear Algebra</li>
              <li>Linear Algebra</li>
              <li>Calculus II &amp; III</li>
              <li>Mathematical Methods in Physical Sciences II</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <h2>Coding Languages</h2>
        <div className="skills-grid">
          {codingLanguages.map((language) => (
            <article key={language.name} className="skill-chip">
              <img src={language.icon} alt={`${language.name} logo`} />
              <span>{language.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <h2>Experience</h2>
        <div className="experience-list">
          <div className="experience-item">
            <div className="exp-header">
              <h3>SAS</h3>
              <span className="exp-date">May 2026 - Aug 2026</span>
            </div>
            <p className="exp-role">Software Developer &amp; Testing Intern</p>
            <ul className="exp-bullets">
              <li>Flow Team — SAS Studio web application on SAS Viya.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3>North Carolina Football Club</h3>
              <span className="exp-date">Jul — Oct 2025</span>
            </div>
            <p className="exp-role">Part-Time Data Analyst</p>
            <ul className="exp-bullets">
              <li>Analyzed GPS data for 25+ professional athletes</li>
              <li>Sent weekly visual analysis reports to coaches</li>
              <li>Also trained with the professional team at times when needed. Super fun.</li>
            </ul>

          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3>UChicago College IT</h3>
              <span className="exp-date">Sep 2025 — Present</span>
            </div>
            <p className="exp-role">Computer Assistant</p>
            <ul className="exp-bullets">
              <li>Providing IT support for the dean of the college and the faculty that support.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <button
              key={p.title}
              type="button"
              className="project-card project-card--clickable"
              onClick={() => setSelectedProject(p)}
              aria-haspopup="dialog"
              aria-label={`Open details for ${p.title}`}
            >
              <h3>
                {p.title}
                {p.status && <span className="status-badge">{p.status}</span>}
              </h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <span className="project-card-hint">Click for deep dive</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section" id="activities">
        <h2>Extracurriculars &amp; Activities</h2>
        <div className="experience-list">
          <div className="experience-item">
            <div className="exp-header">
              <h3>Financial Markets Program</h3>
            </div>
            <p className="exp-role">Part of my University of Chicago education experience.</p>
            <ul className="exp-bullets education-highlights">
              <li className="financial-program">Selective three-year program focused on quantitative finance through experiential workshops, mentorship, and coursework at Chicago Booth.</li>
              <li>Firm visits and events: IMC Trading visit, Ready State Asset Management visit, Two Sigma (on-campus), D.E. Shaw (on-campus), Millennium Partners (on-campus).</li>
              <li>UChicago Trading Competition — coming soon.</li>
              <li>
                IMC Prosperity 3 participant stats:
                <ul className="financial-stats">
                  <li>Overall: 1,058 / 12,620</li>
                  <li>Manual: 822nd</li>
                  <li>Algorithmic: 1,613th</li>
                  <li>United States: 285th</li>
                </ul>
              </li>
              <li>IMC Prosperity 4 — coming soon.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href = "https://athletics.uchicago.edu/sports/mens-soccer">
                University of Chicago Men's Varsity Soccer
                {' '}</a>
                <a href="https://www.youtube.com/@wuhookicks/videos" target="_blank" rel="noopener noreferrer" className="youtube-link">
                  <svg className="youtube-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </h3>
            </div>
            <ul className="exp-bullets">
              <li>Athletic Honors: All-American 4th Team, All-Region 1st Team, UAA 1st Team, Academic All-District, UAA All Academic
              <li>Cool record: Scored the 2 fastest consecutive goals in program history (19s, 2025)</li>
              </li>
              <li>Part of the leadership council, Team Impact Leadership Team, and Order of the C representative</li>
              
              <li>Grew up playing for NCFC Academy for 7 years</li>
              <li>NCFC USL Two player for 2 years</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href="https://www.uchicagosportsanalytics.com" target="_blank" rel="noopener noreferrer">UChicago Sports Analytics</a></h3>
            </div>
            <p className="exp-role">Webmaster</p>
            <ul className="exp-bullets">
              <li>Solely developed <a href="https://www.uchicagosportsanalytics.com" target="_blank" rel="noopener noreferrer">the club website</a> using TypeScript, React</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href="https://www.marooncapitalventures.com/" target="_blank" rel="noopener noreferrer">Maroon Capital Ventures</a></h3>
            </div>
            <p className="exp-role">Associate Partner</p>
            <ul className="exp-bullets">
              <li>Still a lot more to learn in the VC space.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href="https://www.algogroup.org/" target="_blank" rel="noopener noreferrer">Algo Group</a></h3>
            </div>
            <p className="exp-role">Member</p>
            <ul className="exp-bullets">
              <li>Learning a lot about system design and industry fundamentals.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href="https://mc.uchicago.edu/about.html" target="_blank" rel="noopener noreferrer">Maroon Capital</a></h3>
            </div>
            <p className="exp-role">Analyst</p>
            <ul className="exp-bullets">
              <li>Premier quantitative finance organization</li>
              <li>Learning a lot about quant finance. Project coming soon...</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h3><a href="https://uchicagoktp.com/" target="_blank" rel="noopener noreferrer">Kappa Theta Pi (KTP)</a></h3>
            </div>
            <p className="exp-role">Member</p>
            <ul className="exp-bullets">
              <li>Professional technology fraternity, Theta Class 2024. </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="fun">
        <h2>Other Fun Stuff/Facts</h2>
        <div className="experience-list">
          <div className="experience-item">
            <h3>
              Music Producer
              {' '}
              <a href="https://open.spotify.com/artist/1M0NT8bozrrRO9kquUIrkg?si=R6LYTbwYRb2_2SvM9llH3Q" target="_blank" rel="noopener noreferrer" className="spotify-link">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="Spotify" className="spotify-icon" />
              </a>
            </h3>
            <ul className="exp-bullets">
              <li>wuhoo on all platforms.</li>
              <li>Trying to get better at House/EDM</li>
              <li>10000+ streams, 4000+ listeners.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Marathon (Untrained)</h3>
            <ul className="exp-bullets">
              <li>5 hr 30 min. Terrible time, I know.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Duke and Tottenham Hotspurs fan</h3>
            <ul className="exp-bullets">
              <li>NCAA Champions and Champions League incoming.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <h2>Let's Connect!</h2>
        <div className="contact-cta">
          <p>
            Open to software engineering, product-minded internships, startup opportunities, and cool ideas in sports analytics.
          </p>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name">Name <span className="required-star" aria-hidden="true">*</span></label>
              <input id="contact-name" type="text" name="name" required autoComplete="name" />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email <span className="required-star" aria-hidden="true">*</span></label>
              <input id="contact-email" type="email" name="email" required autoComplete="email" />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Description <span className="required-star" aria-hidden="true">*</span></label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>

            <input type="text" name="_gotcha" className="contact-honeypot" tabIndex={-1} autoComplete="off" />

            <div className="contact-form-footer">
              <button
                type="submit"
                className={`contact-submit${contactStatus === 'success' ? ' contact-submit--success' : ''}`}
                disabled={contactStatus === 'sending'}
              >
                {contactStatus === 'sending' ? 'Sending...' : contactStatus === 'success' ? 'Sent!' : 'Send Message'}
              </button>
              {contactStatus === 'success' && <p className="contact-feedback contact-feedback--success">Message sent. I'll contact you soon. Thanks!</p>}
              {contactStatus === 'error' && <p className="contact-feedback contact-feedback--error">Something went wrong. Please try again or email me directly at (emwu@uchicago.edu).</p>}
            </div>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>
          Edward Wu &middot;{' '}
          <a href="mailto:emwu@uchicago.edu">emwu@uchicago.edu</a>
        </p>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>

            <h3 id="project-modal-title">
              {selectedProject.title}
              {selectedProject.status && <span className="status-badge">{selectedProject.status}</span>}
            </h3>
            <p className="modal-overview">{selectedProject.deepDive.overview}</p>

            <div className="modal-section">
              <h4>Highlights</h4>
              <ul className="exp-bullets">
                {selectedProject.deepDive.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Impact</h4>
              <p>{selectedProject.deepDive.impact}</p>
            </div>

            {selectedProject.deepDive.links.length > 0 && (
              <div className="modal-links">
                {selectedProject.deepDive.links.map((projectLink) => (
                  <a key={projectLink.href} href={projectLink.href} target="_blank" rel="noopener noreferrer">
                    {projectLink.label} <span className="arrow">{' ↗'}</span>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

export default App
