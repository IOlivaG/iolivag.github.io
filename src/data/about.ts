export interface About {
  paragraphs: string[];
  interests: string[];
  short: string[];
}

export const about: About = {
  paragraphs: [
    "I am a researcher in mathematical optimization, with a background in chemical engineering. My work focuses on mathematical programming models for large-scale, structured problems and on the algorithms used to solve them.",
    "I am particularly interested in the mathematical structure underlying these problems and in how exploiting that structure can lead to better formulations and solutions.",
  ],
  interests: [
    "Optimization and operations research, including the algebraic and combinatorial structure of mathematical programs and symmetry reduction",
    "Quantum algorithms: hybrid quantum-classical methods, quantum machine learning, and quantum annealing",
    "Machine learning and data-driven methods for optimization",
    "Applications in energy systems, process systems engineering, and large-scale optimization",
  ],
  short: [
    "Hi, I'm Isaac. I work on mathematical optimization, with a background in chemical engineering.",
    "My research focuses on mathematical programming and the structure of large-scale optimization problems, with applications in energy and process systems.",
  ],
};
