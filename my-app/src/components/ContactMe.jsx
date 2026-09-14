import FadeIn from "./FadeIn";

const contacts = [
  {
    label: "Email",
    value: "huangjustinn@gmail.com",
    href: "mailto:huangjustinn@gmail.com",
    note: "The fastest way to reach me",
  },
  {
    label: "GitHub",
    value: "@jnhuang02",
    href: "https://github.com/jnhuang02",
    note: "Code, experiments, and side projects",
  },
  {
    label: "LinkedIn",
    value: "Justin Huang",
    href: "https://linkedin.com/in/junohu",
    note: "Background and experience",
  },
];

const ArrowUpRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ContactMe = () => (
  <div className="band-ink section">
    <div className="shell">
      <FadeIn>
        <p className="label">04 / Contact</p>
        <h2
          className="display-lg"
          style={{ marginTop: 22, maxWidth: 760 }}
        >
          Open to internships, research, and{" "}
          <span className="serif" style={{ fontStyle: "italic" }}>good problems</span>.
        </h2>
      </FadeIn>

      <FadeIn delay={80}>
        <div
          style={{
            marginTop: "clamp(40px, 5vw, 64px)",
            display: "grid",
            gap: 32,
            alignItems: "end",
          }}
          className="contact-grid"
        >
          <div>
            {contacts.map(({ label, value, href, note }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-row"
              >
                <span className="label contact-row__label">{label}</span>
                <span className="contact-row__main">
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value}
                  </span>
                  <span className="muted" style={{ display: "block", marginTop: 4, fontSize: "0.875rem" }}>
                    {note}
                  </span>
                </span>
                <span className="contact-row__arrow"><ArrowUpRight /></span>
              </a>
            ))}
          </div>

          <div className="contact-cta">
            <a href="mailto:huangjustinn@gmail.com" className="btn btn-primary btn-mono">
              Send a message
            </a>
            <a
              href="mailto:huangjustinn@gmail.com?subject=Quick%20question"
              className="link-arrow"
              style={{ marginTop: 18 }}
            >
              Or just say hello
            </a>
          </div>
        </div>
      </FadeIn>

      <hr className="rule rule-soft" style={{ marginTop: "clamp(56px, 7vw, 88px)" }} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <p className="label" style={{ margin: 0 }}>
          © {new Date().getFullYear()} Justin Huang
        </p>
        <p className="label" style={{ margin: 0 }}>
          Los Angeles, CA — Built with React &amp; Tailwind
        </p>
      </div>
    </div>
  </div>
);

export default ContactMe;
