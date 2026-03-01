import './App.css'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edward-minghao-wu/' },
  { label: 'GitHub', href: 'https://github.com/ewu47' },
  { label: 'Resume', href: '#resume-placeholder' },
  { label: 'Email', href: 'mailto:emwu@uchicago.edu' },
]

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
  status?: string
}

const projects: Project[] = [
  {
    title: 'Fire CV (NexHacks 2nd Place Winner)',
    description: '3D fire safety navigation system — 2nd place out of 100+ teams at Nexhacks.',
    tags: ['Three.js', 'React Three Fiber', 'TypeScript', 'Azure OpenAI'],
    link: 'https://devpost.com/software/fire-cv?ref_content=my-projects-tab&ref_feature=my_projects',
  },
  {
    title: 'Divvy Data Analysis',
    description: 'Interactive visualization of 5M+ Chicago bike trip records with full ETL pipeline.',
    tags: ['PostgreSQL', 'React', 'TypeScript', 'Tableau'],
    link: 'https://ewu47.github.io/Wu-Viz/',
  },
  {
    title: 'UChicago Sports Analytics Site',
    description: 'Official organization website, solely developed and deployed on Vercel.',
    tags: ['TypeScript', 'React', 'Vercel'],
    link: 'https://www.uchicagosportsanalytics.com',
  },
  {
    title: 'maketwentyfour',
    description: 'Multiplayer game of "Make 24"',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'Coming Soon',
  },
  {
    title: 'Pulse',
    description: 'Interactive App and website blocker with social study sessions',
    tags: ['React', 'TypeScript'],
    status: 'Coming Soon',
  },
  {
    title: 'Automated Stock Trading Bot',
    description: 'Asynchronous algorithmic trading system with real-time WebSocket data streaming.',
    tags: ['Python', 'Alpaca API', 'WebSockets'],
  },
]

function App() {
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
              <h3>The University of Chicago</h3>
              <span className="exp-date">Sep 2024 — Jun 2028</span>
            </div>
            <p className="exp-role">B.S. Computer Science, B.A. Statistics — GPA: 3.56/4.00</p>
            <ul className="exp-bullets">
              <li>Coursework: Theory of Algorithms, Databases, Systems Programming, Discrete Mathematics</li>
              <li>Financial Markets Program: Selective three-year program focused on quantitative finance through experiential workshops, mentorship, and coursework at Chicago Booth.</li>
            </ul>
          </div>
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
          {projects.map((p) => {
            const card = (
              <article key={p.title} className={`project-card${p.link ? ' project-card--clickable' : ''}`}>
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
              </article>
            )
            return p.link ? (
              <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                {card}
              </a>
            ) : (
              card
            )
          })}
        </div>
      </section>

      <section className="section" id="activities">
        <h2>Extracurriculars &amp; Activities</h2>
        <div className="experience-list">
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
              <li>Athletic Honors: All-American 4th Team, All-Region 1st Team, UAA 1st Team, Academic All-District, UAA All Academic</li>
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
              <li>Helped out with Human Behavior Co (YC x25) who raised 3.5 million</li>
              <li>Still a lot more to learn in VC.</li>
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
              <li>Professional technology fraternity</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="fun">
        <h2>Fun Things I Do</h2>
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
        </div>
      </section>

      <footer className="footer">
        <p>
          Edward Wu &middot;{' '}
          <a href="mailto:emwu@uchicago.edu">emwu@uchicago.edu</a>
        </p>
      </footer>
    </main>
  )
}

export default App
