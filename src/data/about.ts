export interface About {
  paragraphs: string[];
  interests: string[];
  short: string[];
}

export const about: About = {
  paragraphs: [
    "I am a researcher in mathematical optimization, with a background in chemical engineering. My work focuses on mathematical programming models (linear, mixed-integer, and network models) for large-scale, structured decision problems, and on the algorithms used to solve them.",
    "I am particularly interested in the mathematical structure underlying these problems and in how exploiting that structure can lead to better formulations and solutions.",
  ],
  interests: [
    "Optimization and operations research: linear, mixed-integer, and network optimization; algebraic and combinatorial structure",
    "Quantum optimization and algorithms: hybrid quantum-classical methods, quantum machine learning, and quantum annealing",
    "Machine learning and data-driven methods for optimization",
    "Applications: energy and process systems; scheduling, routing, production and capacity planning",
  ],
  short: [
    "Hi, I'm Isaac. I work on mathematical optimization and operations research.",
    "I build mathematical programming models for large-scale, structured problems, and I am particularly interested in the mathematical structure underlying them and in how exploiting that structure can lead to better formulations and solutions.",
  ],
};
