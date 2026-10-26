import { ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck2, HeartHandshake, Sparkles, UsersRound } from "lucide-react";
import { createElement } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      icon: UsersRound,
      title: "People, all together",
      description: "Keep employee details and team information easy to find and simple to manage.",
      tone: "peach",
    },
    {
      number: "02",
      icon: CalendarCheck2,
      title: "Time that makes sense",
      description: "Make attendance and time-off requests part of a calmer, clearer workday.",
      tone: "sage",
    },
    {
      number: "03",
      icon: HeartHandshake,
      title: "Better team moments",
      description: "Share updates, support managers, and keep everyone connected to what matters.",
      tone: "lavender",
    },
  ];

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="/" aria-label="StaffSync home">
          <span className="brand-mark">S</span>
          <span>StaffSync</span>
        </a>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#why-staffsync">Why StaffSync</a>
          <button className="landing-login" type="button" onClick={() => navigate("/login")}>
            Sign in <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><Sparkles size={15} aria-hidden="true" /> A little more human, every day</div>
          <h1>Good work starts<br />with <span>good people.</span></h1>
          <p>
            StaffSync brings your people, time, and team moments together —
            so the important work feels a little easier.
          </p>
          <div className="hero-actions">
            <button className="hero-primary" type="button" onClick={() => navigate("/register")}>
              Find your flow <ArrowRight size={17} aria-hidden="true" />
            </button>
            <a className="hero-secondary" href="#why-staffsync">
              Take a look <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="avatar-stack" aria-hidden="true"><i>N</i><i>A</i><i>J</i></span>
            <span>A better workday, together.</span>
          </div>
        </div>

        <div className="hero-art" aria-label="A preview of a team's workday">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun" />
          <div className="art-note">
            <span className="note-icon"><CalendarCheck2 size={19} aria-hidden="true" /></span>
            <div><strong>One less thing to juggle</strong><small>Your day, in good hands.</small></div>
            <span className="note-check">✓</span>
          </div>
          <div className="art-sticker">people<br />first <span>✳</span></div>
          <span className="art-caption">WORK, WITH A LITTLE MORE HEART</span>
        </div>
      </section>

      <section className="landing-features" id="why-staffsync">
        <div className="features-heading">
          <div>
            <p className="eyebrow">A GOOD PLACE TO START</p>
            <h2>The everyday, made easier.</h2>
          </div>
          <p>Less back-and-forth. More room for people to do their best work.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ number, icon: Icon, title, description, tone }) => (
            <article className="feature-card" key={number}>
              <div className={`feature-icon ${tone}`}>
                {createElement(Icon, { size: 21, strokeWidth: 1.8, "aria-hidden": true })}
              </div>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand" href="/" aria-label="StaffSync home">
          <span className="brand-mark">S</span><span>StaffSync</span>
        </a>
        <p>Good people. Good work. Better days.</p>
        <span>© {new Date().getFullYear()} StaffSync</span>
      </footer>
    </main>
  );
};

export default Home;
