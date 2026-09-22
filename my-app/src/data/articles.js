import weightsBanner   from "/src/imgs/weights.png";
import niners   from "/src/imgs/niners.jpg";
import ycAiImg         from "../imgs/yc_ai.png";
import techStocksImg   from "../imgs/tech_stocks.png";
import techLayoffsImg  from "../imgs/tech_layoffs.png";
import ycGraphImg      from "../imgs/yc_graph.png";
import curry from "/src/imgs/curry.jpg";
import goggins from "/src/imgs/david_goggins.jpeg";
import change from "/src/imgs/change.jpg";
import ichiran from "/src/imgs/ichiran.webp";
import doomscrolling from "/src/imgs/doomscrolling.jpg";
import alone from "/src/imgs/alone.webp";

const articles = [
  {
    slug: "the-miniaturization-imperative",
    title:
      "The Miniaturization Imperative: Sustainable Edge Inference and the Compression of Frontier LLMs",
    date: "September 2026",
    readTime: "4 min read",
    tags: ["AI", "LLMs", "Research", "Hardware"],
    excerpt:
      "Frontier models need terabytes of memory; consumer devices offer 128 gigabytes. Closing that 40-fold gap is not a hardware problem to wait out — it is an algorithmic one, and the timeline to edge viability is already compressing by nearly a decade.",
    content: [
      {
        type: "h2",
        text: "Introduction",
      },
      {
        type: "p",
        text: "The transition from centralized cloud infrastructure to edge-native inference for Large Language Models (LLMs) represents a critical evolution in computational architecture. Driven by the need to mitigate the immense energy consumption and latency bottlenecks of hyperscale data centers, the industry is pursuing radical spatial and memory compression. This paper examines the scaling deficit between frontier LLM parameter footprints and edge hardware limitations, proposing that the convergence of extreme quantization, structural sparsity, and hardware-algorithm co-design will make local execution of frontier intelligence viable within the next decade.",
      },
      {
        type: "h2",
        text: "The Pursuit of Extreme Miniaturization",
      },
      {
        type: "p",
        text: "The trajectory of computational architecture is defined by the progressive compression of physical footprint and energy overhead. This engineering drive toward radical miniaturization is frequently mirrored in modern cultural narratives. In Sam Raimi's Spider-Man 2, Dr. Otto Octavius engineered precision mechanical actuators to facilitate a breakthrough in nanotechnology and spatial compression. His objective — to harness a self-sustaining fusion reactor \"in the palm of [his] hand\" — represented the ultimate scaling thesis: collapsing a solar-scale physical phenomenon into a localized, human-scale form factor.",
      },
      {
        type: "p",
        text: "This fictional obsession with extreme spatial compression parallels tangible milestones in the technology industry. In modern engineering lore, this principle is exemplified by Steve Jobs's demonstration of the original iPod prototype. By submerging the device in a fish tank and pointing to the escaping air bubbles, Jobs demonstrated that perceived limits of packaging density are frequently an artifact of conservative design rather than absolute engineering constraints. The escaping air proved that unutilized physical space could still be engineered away.",
      },
      {
        type: "p",
        text: "Contemporary frontier Artificial Intelligence currently occupies a mainframe phase, heavily reliant on massive, resource-intensive containment systems in the form of hyperscale data centers. The fundamental research objective of sustainable AI is not to expand external containment infrastructure indefinitely, but to compress the computational core so that it executes autonomously within edge environments.",
      },
      {
        type: "h2",
        text: "Hardware Constraints and Memory Bottlenecks",
      },
      {
        type: "p",
        text: "The primary barrier preventing the deployment of frontier-grade LLMs onto localized consumer hardware is the acute disparity between model parameter footprints and physical memory subsystems. Frontier architectures have scaled from multi-billion parameter foundations to dense and semi-dense designs exceeding 1.8 trillion parameters, with next-generation iterations projected to span between 10 and 20 trillion parameters.",
      },
      {
        type: "p",
        text: "Memory allocation during inference is governed by parameter weight storage and dynamic Key-Value (KV) cache expansion. Assuming standard 4-bit quantization, where each weight consumes approximately 0.5 bytes, a 10-trillion-parameter frontier model requires a minimum of 5 terabytes of Video Random Access Memory (VRAM) strictly for weight allocation. In contrast, premium unified-memory architectures on contemporary consumer edge devices maximize at approximately 128 gigabytes, exposing a 40-fold hardware deficit.",
      },
      {
        type: "p",
        text: "If hardware capacity scaling continues exclusively under the historical cadence of Moore's Law, bridging this 40-fold gap requires between five and six consecutive doubling cycles. Evaluated purely as a hardware-scaling challenge, edge deployment of frontier-scale intelligence would remain unfeasible until approximately 2038 to 2041.",
      },
      {
        type: "h2",
        text: "Algorithmic Compression and Sparsity",
      },
      {
        type: "p",
        text: "The deployment timeline is being significantly accelerated by concurrent algorithmic compression techniques designed to optimize inference within embedded constraints, proving that the \"empty space\" in neural networks can be systematically removed.",
      },
      {
        type: "h3",
        text: "Activation-aware Weight Quantization (AWQ)",
      },
      {
        type: "p",
        text: "Quantization methodologies systematically reduce the precision of model weights from standard floating-point (FP16) representations. Lin et al. (2023) demonstrated that not all weights in an LLM are equally important, proposing Activation-aware Weight Quantization (AWQ). By protecting only the 1% of salient weights corresponding to larger activation magnitudes, AWQ significantly reduces the memory footprint of on-device LLM inference while avoiding the hardware-inefficient mixed-precision implementation.",
      },
      {
        type: "h3",
        text: "Extreme Quantization and 1-Bit Architectures",
      },
      {
        type: "p",
        text: "Pushing quantization to its theoretical limits, researchers have introduced 1-bit and ternary representation frameworks. Ma et al. (2024) introduced BitNet b1.58, an architecture where every parameter is ternary (-1, 0, 1). This approach matches full-precision Transformer performance while radically decreasing latency, memory bandwidth requirements, and energy consumption. By scaling activations per token rather than relying on zero-point quantization, the 1.58-bit LLM establishes a new scaling law that enables highly efficient on-device execution.",
      },
      {
        type: "h3",
        text: "Structural Sparsity via Mixture of Experts",
      },
      {
        type: "p",
        text: "To address active compute ceilings, structural sparsity decouples total model capacity from inference bandwidth. Jiang et al. (2024) formalized this with Mixtral 8x7B, a Sparse Mixture of Experts (SMoE) model. By utilizing a router network to dynamically select only two experts per token at each layer, Mixtral grants each token access to 47 billion parameters while only utilizing 13 billion active parameters during inference. This sparse activation drastically lowers the active memory bandwidth required, allowing models to scale effectively without paralyzing edge hardware.",
      },
      {
        type: "h2",
        text: "Projected Trajectory and Conclusion",
      },
      {
        type: "p",
        text: "When predictable silicon scaling is compounded by aggressive software compression — namely AWQ, ternary quantization, and SMoE routing — the timeline to edge viability compresses by nearly a decade. The convergence of unified memory fabrics and extreme algorithmic miniaturization projects that localized consumer devices will be capable of executing current frontier-class intelligence by 2032 to 2035.",
      },
      {
        type: "p",
        text: "Like the nanoscale engineering required to harness fusion, or the elimination of empty space inside early consumer electronics, the tech industry is systematically eliminating architectural inefficiencies in neural networks. Sustainable AI will not be achieved by building larger data centers, but by shrinking the \"star\" until it fits reliably in the palm of our hands.",
      },
      {
        type: "h2",
        text: "References",
      },
      {
        type: "link",
        href: "https://arxiv.org/abs/2306.00978",
        text: "Lin, J., Tang, J., Tang, H., Yang, S., Dang, X., & Han, S. (2023). AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration. Proceedings of Machine Learning and Systems (MLSys).",
      },
      {
        type: "link",
        href: "https://arxiv.org/abs/2402.17764",
        text: "Ma, S., Wang, H., Ma, L., Wang, L., Wang, W., Huang, S., Dong, L., Wang, R., Xue, J., & Wei, F. (2024). The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits. arXiv preprint arXiv:2402.17764.",
      },
      {
        type: "link",
        href: "https://arxiv.org/abs/2401.04088",
        text: "Jiang, A. Q., Sablayrolles, A., Roux, A., Mensch, A., Savary, B., Bamford, C., ... & El Sayed, W. (2024). Mixtral of Experts. arXiv preprint arXiv:2401.04088.",
      },
    ],
  },
  {slug: "the-upgrade-trap",
    title: "The Upgrade Trap: Why More Never Feels Like Enough",
    date: "June 2026",
    readTime: "4 min read",
    tags: ["Thoughts", "Life", "Psychology", "Society"],
    banner: "https://static0.moviewebimages.com/wordpress/wp-content/uploads/2022/09/Fight-Club.jpg?q=50&fit=crop&w=825&dpr=1.5",
    excerpt:
      "The teenager walking to school wishes he had a bike. The guy on the bike wishes he had a car. The 40 year old millionaire in the sports car looks at the teenager walking to school and says \"I wish I could be young again\"",
    content: [
    {
      type: "p",
      text: "I was a big sneakerhead in high school. Every few months a new Jordan colorway would drop and I would convince myself that this pair would finally feel like enough to bring me satisfaction. It never did. The box would open, the shoes would hit the shelf, and within a week I was already looking at the next release.",
    },
    {
      type: "image",
      src: "https://store.yankeekicks.com/cdn/shop/products/14267376_34425979_1000.jpg?v=1663696156",
      alt: "Nike sneakers",
      caption: "Jordan 1 Breds, one of the most coveted and iconic sneakers of all time",
    },
    {
      type: "p",
      text: "There is a name for this. Hedonic adaptation. We calibrate to whatever we have, and then want more. A raise feels like a windfall for a month, then it becomes the new normal. A dream apartment feels like a luxury until it is just where you live. The things we chase so hard disappear the moment we catch them.",
    },
    {
      type: "h2",
      text: "Fulfillment",
    },
    {
      type: "p",
      text: "I was about 40 pounds overweight in high school. For a long time I treated it the same way I treated everything else. I told myself it would sort itself out once I got to college, once I got busier, once I finally cared enough. I kept pushing the problem forward.",
    },
    {
      type: "p",
      text: "When I started losing the weight I made myself a promise. Once I hit my goal, I could stop. Diet, gym, all of it. I thought the finish line was the point.",
    },
    {
      type: "p",
      text: "I was wrong. What I found was that the discipline itself was the thing I needed. Not the destination. Showing up every day, doing something hard and doing it again the next morning, that was what kept everything else in order. The moment I tried to quit was the moment things started slipping. Not just physically, but everywhere.",
    },
    {
      type: "image",
      src: "https://i.ytimg.com/vi/Oqw32w49KD0/sddefault.jpg",
      alt: "The rock working out",
      caption: "Raise the bar",
    },
    {
      type: "p",
      text: "There is no finish line. That used to scare me. Now I think it is the whole point.",
    },
    {
      type: "p",
      text: "Something I started doing was changing the way I talk about my day. Instead of saying I have to go to class, I say I get to go to class. Not everyone has the opportunity to be in school. Instead of saying I have to go to the gym, I say I get to go to the gym. Not everyone has that option nearby. Instead of saying I have to go to bed early, I say I get to go to bed early. Not everyone has a bed.",
    },
    {
      type: "blockquote",
      text: "What a privilege it is to be challenged by a life you built on purpose.",
    },
    {
      type: "p",
      text: "Some people live off of hope, where things will eventually get better enough where there is no suffering. They hope that life will feel complete once they get the promotion. Once they get into the right school. Once they buy the house. It is naive to think the perfect life is waiting behind some milestone. The joy comes from the pursuit. The beauty is in the struggle.",
    },
    {
      type: "h2",
      text: "Choosing Your Battles",
    },
    {
      type: "p",
      text: "You can tell a lot about a person by the battles they pick. If someone is upset about getting cut off in traffic, being overcharged a few dollars, or their team losing, they are living small. We cannot grow if we spend our energy on things that will not matter tomorrow.",
    },
    {
      type: "p",
      text: "Everyone has bad days. That is not a problem to solve. It is something to prepare for. Dropping a few hundred dollars on the latest drop will not make your life better or happier. You already know that. Have bigger ambitions. Start a business. Build something. Apply to YC. Shoot for goals that feel too big.",
    },
    {
      type: "p",
      text: "Understanding that nothing you buy will fix the feeling is the first step. The second step is finding something worth building instead.",
    },
    {
      type: "h2",
      text: "Chasing Time",
    },
    {
      type: "p",
      text: "A bear roaming the forest found a pumpkin on the ground. He picked it up. A few minutes later he saw a cantaloupe. He dropped the pumpkin and picked up the cantaloupe. A few minutes later he saw a watermelon. He dropped the cantaloupe. Then he saw a rabbit. He dropped the watermelon and chased it. The rabbit got away. He ended up with nothing.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&auto=format&fit=crop&q=80",
      alt: "Clock on a wall",
      caption: "80 years on this planet if we are lucky. Not a lot of time to keep chasing the wrong thing.",
    },
    {
      type: "p",
      text: "We have 80 years on this planet if we are lucky. That is not a lot of time to keep chasing the wrong thing.",
    },
    {
      type: "p",
      text: "The sneakers are still out there. The next thing is always out there. I still feel the pull sometimes, the itch that says something is missing. That feeling does not go away. I do not think it is supposed to. But I have learned to sit with it longer before I act, and to ask whether I am chasing something real or just running from the fact that I already have enough.",
    },
    {
      type: "p",
      text: "The sun rises and the sun sets every day. The question is whether you show up as the same person you were yesterday, chasing things you cannot change, or whether you build something with the time you have.",
    },
    {
      type: "p",
      text: "Choose your battles.",
    },
  ],
  },
  {
    slug: "dont-think-just-do",
    title: "Don't Think, Just Do: The Problem With Overthinking Complex Belief Systems",
    date: "May 2026",
    readTime: "5 min read",
    tags: ["Thoughts", "Society", "Philosophy", "Life", "Psychology"],
    banner: "https://www.bandt.com.au/information/uploads/2015/06/Screen-Shot-2015-06-11-at-4.29.29-PM.png",
    excerpt:
      "Does objective truth exist? If the answer is no, is that answer itself objectively true? The honest answer is that most of us never figure it out, and the attempt to do so can cost us more than we realize.",
    content: [

      {
        type: "h2",
        text: "The Fear Factor",
      },
      {
        type: "p",
        text: "We have all been approached on the way to class, to work, or even at home by someone representing a cause or belief system, asking for a quick minute of our time. Whether it is a religious group, a political organization, or a community movement, each one introduces its own way of life and its own version of the truth. This is not a critique of faith or belief itself. People find genuine meaning, community, and purpose through religion and shared values every day. The concern is with a specific tactic that cuts across all of these groups: the use of fear to bypass your ability to think for yourself.",
      },
      {
        type: "p",
        text: "That consequence-driven messaging is everywhere. Every time I turn on the television, open the internet, or take a walk through the city, I encounter it. Do this or face eternal damnation. Vote for this candidate or watch your way of life disappear. Fear is one of the most effective motivating tools in existence. It grips people, redirects their time, their money, and their energy, and replaces rational thinking with urgency. Over time, that kind of sustained fear produces anxiety, stress, and a quiet erosion of personal happiness.",
      },
      {
        type: "image",
        src: "https://capitalethiopia.com/wp-content/uploads/2020/05/Editorial-2.jpg",
        alt: "Fear mongering",
        caption: "Fear mongering has become one of the most common tools used to influence public opinion.",
      },
      {
        type: "h2",
        text: "Is It Really That Deep?",
      },
      {
        type: "p",
        text: "Some argue that the stakes are too high to ignore, that time is running out and action must be taken immediately or the consequences will be irreversible. But this is not a new story. The same alarm has been sounded during the Black Plague, World War I, World War II, the Cold War, and every major crisis in between. It is the oldest narrative in human history, a boy crying wolf on a loop.",
      },
      {
        type: "p",
        text: "Could the world end tomorrow? Technically yes. But dedicating your mental and emotional energy to outcomes entirely outside your control is not preparation. It is paralysis. The next time someone tells you civilization is collapsing, ask yourself whether there is any concrete logic or evidence behind that claim before you let it take up space in your head.",
      },
      {
        type: "h2",
        text: "What Happens When People Stop Thinking for Themselves",
      },
      {
        type: "p",
        text: "The most dangerous version of this problem is not personal anxiety. It is what happens when fear and belief are weaponized by someone with enough charisma to exploit them.",
      },
      {
        type: "p",
        text: "Jim Jones founded the People's Temple in the 1950s, preaching racial integration, progressive ideals, and the promise of a socialist utopia. His message attracted nearly a thousand followers. To avoid government scrutiny, he relocated the entire group to Guyana and established a settlement called Jonestown. What followed was closer to a forced labor camp than a utopia, with physical punishment and the use of drugs to control the population.",
      },
      {
        type: "image",
        src: "https://s.yimg.com/ny/api/res/1.2/LEwBDqPw1pMh5sFH7sq6LA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD03NjQ7Y2Y9d2VicA--/https://s.yimg.com/os/creatr-uploaded-images/2025-05/564ad5b0-2db9-11f0-89f7-dd401c79d499",
        alt: "Empty dense jungle path",
        caption: "Jonestown was established deep in the jungles of Guyana, deliberately isolated from the outside world.",
      },
      {
        type: "p",
        text: "When Congressman Leo Ryan traveled to Jonestown to investigate in 1978, he and members of his delegation were killed. In response, Jones orchestrated a mass tragedy in which over 900 followers lost their lives. Jones built his following using the same tools that appear in milder forms every day: fear, the promise of belonging, and the quiet suggestion that individual judgment should be surrendered to something larger. The result was catastrophic. Thinking for yourself is not just a philosophical preference. It is a form of self-preservation.",
      },
      {
        type: "link",
        href: "https://www.fbi.gov/history/cases-and-criminals/jonestown",
        text: "FBI: Jonestown Case History",
      },
      {
        type: "h2",
        text: "The Paradox of Overthinking",
      },
      {
        type: "p",
        text: "Here is the irony in all of this. Philosophy has grappled with questions of truth and meaning for thousands of years without consensus. That is not a failure of philosophy. It is a reflection of how genuinely difficult these questions are.",
      },
      {
        type: "p",
        text: "At some point, the pursuit of the perfect belief system stops being productive and starts being a distraction. People have lived meaningful, grounded, and successful lives across every religion, political persuasion, and philosophical tradition imaginable. The common thread is rarely which belief they held. It is that they committed to something, stopped second-guessing it, and got on with living.",
      },
      {
        type: "image",
        src: "https://adaa.org/sites/default/files/2023-11/iStock-1472513556%20ocd%20purchased%20small%20woman_0.jpg",
        alt: "Overthinking",
        caption: "Overthinking about something may cause more confusion",
      },
      {
        type: "h2",
        text: "Conclusion",
      },
      {
        type: "p",
        text: "You are not going to think your way to a definitive answer on objective truth. Neither is anyone else. What you can do is develop enough critical thinking to recognize when fear is being used to manipulate you, enough self-awareness to question what you are told, and enough conviction to live according to your own values without waiting for the world to hand you a certified correct answer.",
      },
      {
        type: "p",
        text: "Don't think so hard that you forget to live. But don't stop thinking altogether either. The balance between those two things is closer to wisdom than any doctrine I have come across.",
      },
      {
        type:"blockquote",
        text: " Live. Laugh. Love."
      },
    ],
  },
  {
    slug: "adapting-to-societal-changes",
    title: "Addressing the Increasing Dichotomy of Society: The Importance of Adapting to Changes Outside Our Control",
    date: "March 2026",
    readTime: "4 min read",
    tags: ["Thoughts", "Society", "Psychology", "Life"],
    banner: change, 
    excerpt:
      "Massive leaps in technology have led to increased isolation in modern society. As we become more introverted as a collective, it is important to adapt to these rapid changes if we want to succeed.",
    content: [
      {
        type: "p",
        text: "I was recently in New York's infamous Ichiran ramen restaurant when I noticed the unique seating arrangement where ramen is delivered in small windows at individual cubicles, preserving privacy and minimizing human interaction. This concept is not unique to New York. Japan, a society well known for being more introverted than the United States, has seen its low interaction ramen booths explode in popularity.",
      },
      {
        type: "image",
        src: ichiran,
        alt: "Ichiran ramen restaurant",
        caption: "Ichiran ramen seating setup in NYC location",
      },
      {
        type: "p",
        text: "Although American culture is vastly different from Japan's, there is a distinct contrast in human interaction today compared to 50 or 60 years ago. Parks and shopping malls are no longer bustling hubs of families and friends. People spend more time indoors, doomscrolling on social media or gaming. As technology improves and the need for face-to-face interaction decreases, introversion will become more prevalent. The progression of technology is largely outside our control, and it is important to accept and adapt if we wish to thrive.",
      },
      {
        type: "h2",
        text: "The Evolution of Society",
      },
      {
        type: "p",
        text: "Humans are predictable. We have not changed much since our ancestors walked the earth thousands of years ago. The greed, wars, and corruption we see today are nothing new. However, the same cannot be said for human relationships and social norms. One hundred years ago, women and people of color could not vote. Seventy years ago, interracial and same-sex relationships were illegal. As time progresses, these dynamics will continue to shift.",
      },
      {
        type: "p",
        text: "Take divorce rates for instance. Despite a slight decline from their 1980s peak, divorce rates today remain significantly higher than they were a century ago, rising from 9.2 divorces per 1,000 married women in the mid-20th century to 22.6 at their peak. Marriage rates are projected to decline further among Gen Z, where just over 50 percent are expected to get married, compared to 77 to 96 percent of Baby Boomers who settled down and got married. Regardless of what drives these numbers, we have to accept that some of us may never find a lifelong partner, and that is okay.",
      },
      {
        type: "blockquote",
        text: "Whatever happens, happens.",
      },
      {
        type: "p",
        text: "Some see this as a bad thing, and it is not hard to understand why. I see this everywhere I go: at bars, on forums, across social media. It has fueled a rise in dating apps, dating coaches, and matchmaking events, as people look for connection in an increasingly disconnected world.",
      },
      
      {
        type: "p",
        text: "The desire for companionship is completely natural. At the same time, it is worth keeping in mind that marriage comes with its own set of challenges, as the divorce rates suggest. Being single is nothing new, and for some, shifting focus toward personal growth and professional goals has proven to be just as fulfilling. A relationship is not the only path to a meaningful life. Many accomplished people in business and sports have found success and purpose without one, though that is not to say relationships cannot be a source of strength as well.",
      },
      {
        type: "image",
        src: alone,
        alt: "Person sitting alone in a park",
        caption: "Importance of being comfortable alone",
      },
      {
        type: "h2",
        text: "Relationships",
      },
      {
        type: "p",
        text: "Platonic relationships follow a similar pattern. Just as people focus heavily on the lack of romantic partners, many also complain about not having enough friends. The same logic applies: it is not the end of the world.",
      },
      {
        type: "p",
        text: "One of the most underrated skills a person can develop is being comfortable with their own company. Society does not owe anyone a social circle, and coming to terms with periods of loneliness is part of navigating modern life.",
      },
      {
        type: "h2",
        text: "Conclusion",
      },
      {
        type: "p",
        text: "The world is changing faster than most of us can keep up with. Technology is reshaping how we connect, who we connect with, and in many cases, whether we connect at all. Society's definition of relationships, both romantic and platonic, will keep evolving whether we like it or not.",
      },
      {
        type: "p",
        text: "The people who struggle most are those who resist these changes, who chase an idea of life that may no longer exist. The people who succeed are the ones who accept reality as it is, build on what they have, and stop waiting for the world to meet them where they stand. Adapting is not giving up. It is the most practical thing you can do.",
      },
      {
        type: "h2",
        text: "References & Data",
      },
      { 
        type: "link", 
        href: "https://www.nationalaffairs.com/publications/detail/the-evolution-of-divorce", 
        text: "National Affairs: The Evolution of Divorce" 
      },
      { 
        type: "link", 
        href: "https://marriagefoundation.org.uk/research/the-collapse-of-marriage-among-gen-z/", 
        text: "Marriage Foundation: The Collapse of Marriage Among Gen Z" 
      },
    ],
  },
  {
    slug: "sports-obsession",
    title: "Obsession with sports: Why are people invested so much in a team?",
    date: "November 2025",
    readTime: "3 min read",
    tags: ["Thoughts", "Sports", "Life", "Society", "Psychology"],
    banner: niners,
    excerpt:
      "From gladiator fights in ancient Rome to packed NBA arenas today, sports have been a constant in human civilization. People dedicate years, and even lifetimes to following a team.I have been watching sports for as long as I can remember, yet I do not have a team. And I think this is fine, even good.",
    content: [
  {
    type: "p",
    text: "I grew up in the Bay Area, a once prosperous region for sports. Before the great exodus, Oakland had the Warriors, Raiders, and A's. San Francisco was home to the Giants and the Niners. San Jose housed the infamous Sharks. Growing up surrounded by sport fans, I was always puzzled by what qualified someone as a \"true\" fan. What gave someone the right to use the word \"we\" when referring to a team they had never played for, never coached, never had any direct relation to? Was it because the team played in your city? Because a family member passed the loyalty down to you? Because you liked a certain player? I never found a satisfying answer, and because of that, I never picked a team.",
  },
  {
        type: "image",
        src: curry,
        alt: "Stephen Curry shooting a 3 pointer",
        caption: "Stephen Curry, one of the most iconic athletes in the Bay Area",
      },
  {
    type: "h2",
    text: "The Big Question",
  },
  {
    type: "p",
    text: "Unless you have a financial stake in a team, a win or a loss has no direct impact on your life. Your rent does not go down because the Warriors won. Your boss does not give you a raise because the Niners made the playoffs. It can also be reasonably assumed that you cheering from your couch does not change the outcome on the field. So why do people feel depressed over a result they had no control over and that does not affect their everyday lives?",
  },
  {
    type: "h2",
    text: "Human Behavior",
  },
  {
    type: "p",
    text: "A big part of human nature is fixating on others rather than ourselves. It is always easier to look outward than inward. We see this in how people treat celebrities, obsessing over who they are dating, what they said in an interview, or when their next project is dropping. We pour energy into the lives of people who do not know we exist. Sports fandom can fall into the same trap. When a team loses, fans spiral. When a team wins, fans feel on top of the world, as if they had anything to do with it. The emotional investment is real, but the return on that investment is almost always zero.",
  },
  {
    type: "h2",
    text: "Real Change",
  },
  {
        type: "blockquote",
        text: "Be the change you want to be",
      },
  {
    type: "p",
    text: "Your life will not improve because the Lakers won a championship. Wearing a lucky jersey or sitting in your designated couch spot will not determine the outcome of the game. At some point I realized that if I was going to invest time and energy into something, it should be something that actually moves the needle in my own life. Instead of riding the highs and lows of a team I have no real connection to, I could spend that energy on something that compounds. A workout. A book. A project. Learning an instrument or a new language. Something that, win or lose, leaves you better than you were before.",
  },
  {
    type: "h2",
    text: "Touch Grass",
  },
  {
    type: "p",
    text: "I am not telling you to stop watching sports or to drop your team. Sports are entertaining and there is nothing wrong with enjoying them. What I am saying is that the outcome is not that deep. I would bet that some fans get more worked up over a loss than the players who actually played in the game. Do not be that person. Do not let someone else's win or loss dictate your mood, your week, or your sense of self. Be that obsessive about your own life instead. Your own goals, your own progress, your own scorecard. You might be surprised how far that mindset takes you.",
  },
  {
        type: "image",
        src: goggins,
        alt: "David Goggins",
        caption: "David Goggins, motivational speaker and former Navy SEAL known for his philosophy of embracing discomfort to achieve growth",
      },
],
  },
  {
    slug: "the-weight-of-ai",
    title: "The \"Weights\" of AI: Reflections on the implications of complex automation",
    date: "September 2025",
    readTime: "5 min read",
    tags: ["Reflections", "Writing", "AI"],
    banner: weightsBanner,
    excerpt:
      "Technology evolves rapidly. The tech industry we know today may look different tomorrow. As Artificial Intelligence (AI) continues to advance, it becomes a powerful tool that we use in our daily lives. Investors see the immense potential in Artificial Intelligence, pouring billions of dollars into companies like OpenAI, Anthropic, and Nvidia. But with every booming industry, it brings up the question: what are the long term impacts of this newfound technology?",
    content: [
      {
        type: "p",
        text: "\"The job market is cooked.\" I often hear this from my friends and honestly, they are not wrong. The unemployment rate among recent graduates is at a record high, with many struggling to find work amid widespread layoffs and hiring freezes. Companies are cutting costs by shrinking their workforce, often believing that one employee with Artificial Intelligence tools can accomplish the work of five. Stock prices of tech companies are at record highs, yet these valuations often seem disconnected from the broader economy.",
      },
      {
        type: "h2",
        text: "Methodology",
      },
      {
        type: "p",
        text: "To better understand this paradox, I examined recent data on layoffs, job postings, and funding trends in the tech sector. Sources such as Layoffs.fyi, TechCrunch, and Yahoo Finance reveal that while tech funding has increased dramatically, employee count in established companies has declined. This illustrates that while capital is flooding into innovation, the benefits may not be evenly distributed across the labor market.",
      },
      {
        type: "p",
        text: "For data on tech layoffs, I reference graphs from Layoffs.fyi, which track the number of employees laid off and the number of companies conducting layoffs by month throughout 2025. These visualizations help illustrate how layoffs have evolved over time and support the argument that, regardless of broader economic conditions, tech layoffs appear to be a persistent trend.",
      },
      {
        type: "p",
        text: "To analyze stock performance, I use data from Yahoo Finance to show how companies such as Microsoft and Nvidia have recently reached record-high stock prices, even amid ongoing reports of large-scale layoffs. This contrast underscores the idea that rising corporate valuations do not necessarily translate into greater job security — a sign of how AI may be reshaping workforce needs.",
      },
      {
        type: "p",
        text: "Lastly, for startup activity, I introduce the rapid growth of AI-centered startups and the record number of applications reported by Y Combinator (YC). Since the data is difficult to find, I have used a graph from r/dataisbeautiful displaying the percentage of YC-backed companies focused on AI over time. This data demonstrates how interest and investment in AI entrepreneurship continue to accelerate and contribute to the shifting dynamics of the tech labor market.",
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "p",
        text: "Supporters of AI, such as CEOs Sam Altman of OpenAI and Jensen Huang of Nvidia, argue that this technological shift represents progress rather than loss. They highlight that AI can serve as a tutor, coworker, mentor, artist, researcher, or analyst — enhancing productivity and creativity. The surge in startup funding supports this optimism: Y Combinator and other accelerators report record numbers of AI-related applicants, and billions in venture capital are chasing new ideas. Tech stocks are at record highs, suggesting that tech companies are doing better than ever. But can the same be said for their employees?",
      },
      {
        type: "image",
        src: ycAiImg,
        alt: "Chart showing the percentage of YC-backed companies focused on AI over time",
        caption: "AI YC companies (Source: Reddit, r/dataisbeautiful)",
      },
      {
        type: "image",
        src: techStocksImg,
        alt: "Chart showing the history of tech stock prices including Microsoft and Nvidia",
        caption: "History of tech stock prices (Source: Yahoo Finance)",
      },
      {
        type: "p",
        text: "The other side of the debate paints a less optimistic picture. The acceleration of automation threatens millions of jobs across industries. Andrew Yang, an entrepreneur and former presidential candidate, warned about this very scenario when advocating for a Universal Basic Income to counteract technology-driven job loss. Today, that prediction feels closer than ever. With rising costs of living and new wage laws, many companies are turning to kiosks, robots, and self-service systems to replace human labor. As automation grows, consumer spending may shrink, creating a feedback loop of lower demand and higher unemployment. Although layoffs have died down compared to 2023, they remain at levels higher than the pre-pandemic era, suggesting that companies are still attempting to cut down their workforce.",
      },
      {
        type: "image",
        src: techLayoffsImg,
        alt: "Chart showing tech layoffs over time since the pandemic",
        caption: "Tech layoffs over time since the pandemic (Source: Layoffs.fyi)",
      },
      {
        type: "h2",
        text: "Conclusion",
      },
      {
        type: "p",
        text: "AI is still a relatively young technology, and time will reveal whether it ushers in an age of prosperity or deep inequality. Regardless of which side proves correct, one thing is certain: the world as we knew it just a few years ago will never be the same. As investors and consumers, we must learn to navigate this new landscape and balance optimism with caution as Artificial Intelligence continues to reshape the global economy.",
      },
    ],
  },
];

export default articles;
