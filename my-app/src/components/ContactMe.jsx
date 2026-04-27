import React from "react";

const contacts = [
  {
    label: "Email",
    value: "huangjustinn@gmail.com",
    href: "mailto:huangjustinn@gmail.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "@jnhuang02",
    href: "https://github.com/jnhuang02",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Justin Huang",
    href: "https://linkedin.com/in/justinnhuang",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const ContactMe = () => {
  return (
    <div className="w-full py-28 px-6" style={{ background: "#0e1525" }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Get in touch
            </span>
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
          />
          <p className="mt-6 text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            I'm always open to new opportunities, collaborations, or just a friendly chat.
            Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contacts.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "#60a5fa",
                }}
              >
                {icon}
              </div>
              <div>
                <p className="font-semibold text-white mb-0.5">{label}</p>
                <p className="text-blue-400 text-sm">{value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:huangjustinn@gmail.com">
          <button
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            }}
          >
            Send Me a Message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </a>

        {/* Footer */}
        <p className="mt-16 text-gray-600 text-sm">
          © {new Date().getFullYear()} Justin Huang · Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default ContactMe;
