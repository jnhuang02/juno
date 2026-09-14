import FadeIn from "./FadeIn";

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
        <h2 className="display-lg">{title}</h2>
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
    </header>
  </FadeIn>
);

export default SectionHeader;
