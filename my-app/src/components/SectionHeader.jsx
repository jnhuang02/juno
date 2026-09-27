import FadeIn from "./FadeIn";
import BlurText from "./reactbits/BlurText";

/**
 * Section header: a hairline rule, then the title with its description
 * stacked underneath (no separate eyebrow, and no side-by-side
 * headline/explainer split).
 */
const SectionHeader = ({ title, description, id }) => (
  <FadeIn>
    <header className="section-head" id={id}>
      <div className="section-head__grid">
        <BlurText tag="h2" className="display-lg" text={title} delay={45} />
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
    </header>
  </FadeIn>
);

export default SectionHeader;
