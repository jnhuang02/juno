// Project case studies. Mirrors the shape of articles.js so the detail page
// can render rich, structured content blocks (p / h2 / image / blockquote / link / metric).

const projects = [
  {
    slug: "superhero-dashboard",
    title: "Superhero Dashboard",
    tagline: "An interactive web app for exploring superhero stats with dynamic data and a responsive UI.",
    image:
      "https://preview.redd.it/redownloaded-reddit-just-to-say-that-no-character-in-v0-f2ufmu6atvl91.jpg?width=640&crop=smart&auto=webp&s=6eb7e2d0938601816528b411599dbde0f4fad8ee",
    link: "https://jnhuang02.github.io/superhero-hub/",
    repo: "https://github.com/jnhuang02/superhero-hub",
    tags: ["React", "JavaScript"],
    role: "Solo Developer",
    timeline: "2024",
    stack: ["React", "JavaScript", "REST API", "CSS", "GitHub Pages"],
    overview:
      "A single-page application that pulls live superhero data from a public API and presents it through a clean, card-based interface with search, filtering, and detailed stat breakdowns.",
    metrics: [
      { label: "Characters", value: "700+" },
      { label: "Load time", value: "<1s" },
      { label: "Frontend", value: "React" },
    ],
    content: [
      {
        type: "p",
        text: "Superhero Dashboard started as an exercise in consuming and presenting third-party data cleanly. I wanted to build something that felt responsive and polished while juggling the realities of an external API: rate limits, inconsistent fields, and missing images. The result is a fast, browsable directory of hundreds of characters.",
      },
      {
        type: "h2",
        text: "The Problem",
      },
      {
        type: "p",
        text: "Raw API data is rarely presentation-ready. Power stats arrive as strings, some characters are missing portraits, and the payloads are large. The challenge was turning that into an interface where a user could find a character and understand their strengths at a glance.",
      },
      {
        type: "h2",
        text: "What I Built",
      },
      {
        type: "p",
        text: "I built a component-driven React frontend with a search bar, tag-based filtering, and detail cards that visualize power stats as bars. State is managed locally and the UI updates instantly as the user types. Defensive rendering handles the gaps in the data so the layout never breaks.",
      },
      {
        type: "blockquote",
        text: "Good data presentation is mostly about handling the cases where the data isn't good.",
      },
      {
        type: "h2",
        text: "Outcome",
      },
      {
        type: "p",
        text: "The app loads in under a second, gracefully handles incomplete records, and is deployed on GitHub Pages. It became a template I reused for later data-driven frontends.",
      },
      {
        type: "link",
        href: "https://jnhuang02.github.io/superhero-hub/",
        text: "View the live demo",
      },
    ],
  },
  {
    slug: "mlb-pitcher-durability",
    title: "MLB Pitcher Durability",
    tagline: "A data-driven study of how pitching workloads correlate with injury and longevity across MLB.",
    image:
      "https://images.seattletimes.com/wp-content/uploads/2023/06/06032023_ms_144222.jpg?d=2040x1360",
    link: "https://docs.google.com/presentation/d/1Xe51s4QxqVMGzgYuGSfdgykBxlORkp2KGfvEHUeFXVM/edit?slide=id.p#slide=id.p",
    tags: ["Data Science", "Python"],
    role: "Data Analyst",
    timeline: "2024",
    stack: ["Python", "Pandas", "Matplotlib", "Jupyter", "Statistics"],
    overview:
      "An analytics project investigating the relationship between pitch counts, innings load, and pitcher durability",
    metrics: [
      { label: "Seasons analyzed", value: "10+" },
      { label: "Pitchers", value: "300+" },
      { label: "Toolset", value: "Python" },
    ],
    content: [
      {
        type: "p",
        text: "Pitcher injuries are one of the most expensive problems in baseball. This project set out to quantify how workload",
      },
      {
        type: "h2",
        text: "Approach",
      },
      {
        type: "p",
        text: "I assembled a dataset spanning multiple seasons of MLB pitching statistics, cleaned and normalized the workload metrics, and used Python to explore correlations between cumulative load and subsequent performance or time on the injured list.",
      },
      {
        type: "h2",
        text: "Findings",
      },
      {
        type: "p",
        text: "The analysis highlighted clear inflection points where sustained high workloads preceded performance regression. Visualizing these trends made it possible to identify the thresholds at which durability risk begins to climb.",
      },
      {
        type: "blockquote",
        text: "The data tells a consistent story: the arm has a budget, and teams that ignore it pay for it later.",
      },
      {
        type: "h2",
        text: "Deliverable",
      },
      {
        type: "p",
        text: "The work was packaged into a presentation walking through the methodology, visualizations, and takeaways for a non-technical audience.",
      },
      {
        type: "link",
        href: "https://docs.google.com/presentation/d/1Xe51s4QxqVMGzgYuGSfdgykBxlORkp2KGfvEHUeFXVM/edit?slide=id.p#slide=id.p",
        text: "View the full presentation",
      },
    ],
  },
  {
    slug: "generative-marketing-data",
    title: "Generative Marketing Data",
    tagline: "Using SMOTE oversampling to synthesize balanced training data from a skewed marketing dataset.",
    image:
      "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://drive.google.com/file/d/1-QCTsPo-FBfUOFjdJ5ap_irVOTK8pWQm/view?usp=sharing",
    tags: ["ML", "SMOTE", "Python"],
    role: "ML Engineer",
    timeline: "2024",
    stack: ["Python", "scikit-learn", "imbalanced-learn", "Pandas", "SMOTE"],
    overview:
      "A machine learning project that addresses class imbalance in a marketing dataset by generating synthetic minority-class samples, improving model fairness and recall.",
    metrics: [
      { label: "Technique", value: "SMOTE" },
      { label: "Recall lift", value: "Significant" },
      { label: "Language", value: "Python" },
    ],
    content: [
      {
        type: "p",
        text: "Marketing datasets are notoriously imbalanced, customers who actually convert are a tiny fraction of the whole. Models trained naively on this data learn to ignore the minority class entirely, which is exactly the class we care about.",
      },
      {
        type: "h2",
        text: "The Imbalance Problem",
      },
      {
        type: "p",
        text: "When one class dominates, accuracy becomes a misleading metric: a model can score 95% just by predicting the majority class every time. The real cost is missed conversions, the false negatives that never get flagged.",
      },
      {
        type: "h2",
        text: "Solution: Synthetic Oversampling",
      },
      {
        type: "p",
        text: "I applied SMOTE (Synthetic Minority Over-sampling Technique) to generate new, plausible minority-class examples by interpolating between existing ones. This rebalanced the training set without simply duplicating rows, giving the model genuine signal to learn from.",
      },
      {
        type: "blockquote",
        text: "Balancing the data didn't just improve the numbers — it changed what the model was actually able to learn.",
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "p",
        text: "The rebalanced model achieved meaningfully higher recall on the minority class while holding precision steady, making it far more useful for targeting decisions.",
      },
      {
        type: "link",
        href: "https://drive.google.com/file/d/1-QCTsPo-FBfUOFjdJ5ap_irVOTK8pWQm/view?usp=sharing",
        text: "Read the full write-up",
      },
    ],
  },
  {
    slug: "amazon-book-review-mining",
    title: "Amazon Book Review Mining",
    tagline: "A text-mining and sentiment-analysis pipeline over a large corpus of Amazon book reviews.",
    image: "https://www.promptcloud.com/wp-content/uploads/2018/08/text-analytics-mining-data-1.png",
    link: "https://docs.google.com/presentation/d/15sFH_3zUSQgiE1KM00Ll-Tocv3jPETBmGoQrg-57gv0/edit?slide=id.p#slide=id.p",
    tags: ["NLP", "Python", "Data Science"],
    role: "Data Scientist",
    timeline: "2024",
    stack: ["Python", "NLTK", "scikit-learn", "Pandas", "NLP"],
    overview:
      "An end-to-end NLP pipeline that cleans, tokenizes, and analyzes thousands of Amazon book reviews to extract sentiment and surface what readers actually care about.",
    metrics: [
      { label: "Reviews", value: "Thousands" },
      { label: "Focus", value: "Sentiment" },
      { label: "Domain", value: "NLP" },
    ],
    content: [
      {
        type: "p",
        text: "Reviews are a goldmine of unstructured opinion, but only if you can process them at scale. This project built a pipeline to turn raw Amazon book reviews into structured sentiment signals and recurring themes.",
      },
      {
        type: "h2",
        text: "Pipeline",
      },
      {
        type: "p",
        text: "The workflow started with text cleaning — stripping noise, normalizing case, and removing stop words — followed by tokenization and feature extraction. From there I applied sentiment classification to score each review and aggregated the results.",
      },
      {
        type: "h2",
        text: "Insights",
      },
      {
        type: "p",
        text: "Beyond simple positive/negative labels, the analysis surfaced the specific words and phrases that drove strong reactions, separating reviews that praised content from those reacting to price, shipping, or format.",
      },
      {
        type: "blockquote",
        text: "Sentiment is the headline, but the vocabulary behind it is where the real insight lives.",
      },
      {
        type: "h2",
        text: "Deliverable",
      },
      {
        type: "p",
        text: "The findings were compiled into a presentation detailing the methodology, the sentiment distribution, and the most influential terms.",
      },
      {
        type: "link",
        href: "https://docs.google.com/presentation/d/15sFH_3zUSQgiE1KM00Ll-Tocv3jPETBmGoQrg-57gv0/edit?slide=id.p#slide=id.p",
        text: "View the full presentation",
      },
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    tagline: "This site — a sleek personal portfolio built with React, Tailwind, and a custom design system.",
    image:
      "https://img.pikbest.com/wp/202347/architecture-portfolio-blue-luxury-background-with-abstract-wall-wave-3d-rendered-and-perfect-for-website-presentation-or-use_9759684.jpg!w700wp",
    link: "https://github.com/jnhuang02/juno",
    repo: "https://github.com/jnhuang02/juno",
    tags: ["React", "Tailwind CSS"],
    role: "Designer & Developer",
    timeline: "2025",
    stack: ["React", "Tailwind CSS", "React Router", "Vite", "Vercel"],
    overview:
      "The portfolio you're looking at now: a fully responsive, dark/light themed single-page app with animated sections, a writing platform, and interactive project case studies.",
    metrics: [
      { label: "Themes", value: "Dark / Light" },
      { label: "Framework", value: "React" },
      { label: "Hosting", value: "Vercel" },
    ],
    content: [
      {
        type: "p",
        text: "I wanted a portfolio that didn't feel like a template. The goal was a cohesive design language — consistent gradients, motion, and typography — applied across a home page, an about section, project case studies, and a long-form writing platform.",
      },
      {
        type: "h2",
        text: "Design System",
      },
      {
        type: "p",
        text: "Everything runs on a small set of CSS custom properties that flip between dark and light themes instantly. Accent gradients, fade-in-on-scroll animations, and a shared card vocabulary keep every section feeling like part of the same product.",
      },
      {
        type: "h2",
        text: "Architecture",
      },
      {
        type: "p",
        text: "It's a React single-page app with client-side routing. Content like articles and projects lives in structured data files and is rendered through reusable block components, so adding a new piece of writing or a new case study is a matter of editing data, not markup.",
      },
      {
        type: "blockquote",
        text: "The best design system is the one you never have to fight when you add the next thing.",
      },
      {
        type: "h2",
        text: "Deployment",
      },
      {
        type: "p",
        text: "The site is built with Vite and deployed on Vercel for fast, automatic deploys on every push.",
      },
      {
        type: "link",
        href: "https://github.com/jnhuang02/juno",
        text: "View the source on GitHub",
      },
    ],
  },
  {
    slug: "huffman-visualization",
    title: "Huffman Visualization",
    tagline: "An interactive, web-based visualization of how Huffman encoding builds its compression tree.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Huffman_tree_2.svg/1200px-Huffman_tree_2.svg.png",
    link: "https://saathvikpd.github.io/HuffmanViz/",
    tags: ["Algorithms", "JavaScript"],
    role: "Collaborator",
    timeline: "2023",
    stack: ["JavaScript", "HTML Canvas", "Algorithms", "Data Structures"],
    overview:
      "An educational tool that animates the construction of a Huffman tree step by step, making one of computer science's classic compression algorithms intuitive.",
    metrics: [
      { label: "Topic", value: "Compression" },
      { label: "Type", value: "Interactive" },
      { label: "Stack", value: "JavaScript" },
    ],
    content: [
      {
        type: "p",
        text: "Huffman coding is a cornerstone of data compression, but it's hard to grasp from pseudocode alone. This project makes the algorithm visible: you watch the tree assemble itself, node by node, as the algorithm greedily merges the least frequent symbols.",
      },
      {
        type: "h2",
        text: "Why Visualize It",
      },
      {
        type: "p",
        text: "The magic of Huffman coding is the priority-queue logic that always combines the two smallest nodes. Reading that in a textbook is one thing; watching the tree grow from the leaves up makes the greedy strategy click immediately.",
      },
      {
        type: "h2",
        text: "How It Works",
      },
      {
        type: "p",
        text: "A user enters text, and the tool computes character frequencies, then animates each merge step in the tree. The final structure reveals the variable-length codes that make compression possible — short codes for common characters, longer ones for rare ones.",
      },
      {
        type: "blockquote",
        text: "Some algorithms only really make sense once you can watch them run.",
      },
      {
        type: "h2",
        text: "Outcome",
      },
      {
        type: "p",
        text: "The result is a lightweight, browser-based teaching aid that turns an abstract algorithm into something you can step through and explore.",
      },
      {
        type: "link",
        href: "https://saathvikpd.github.io/HuffmanViz/",
        text: "Try the live visualization",
      },
    ],
  },
];

export default projects;
