import FadeIn from "./FadeIn";
import BlurText from "./reactbits/BlurText";

/**
 * Editorial section header in the style of the reference sites:
 * a hairline rule on top, a mono index/eyebrow label, the title set
 * large on the left and the description pinned to the right column.
 */
const SectionHeader = ({ index, eyebrow, title, description, id }) => (
  <FadeIn>
    <header className="section-head" id={id}>
      <p className="label">
        {index ? `${index} / ` : ""}
        {eyebrow}
      </p>
      <div className="section-head__grid">
        <BlurText tag="h2" className="display-lg" text={title} delay={45} />
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
    </header>
  </FadeIn>
);

export default SectionHeader;
