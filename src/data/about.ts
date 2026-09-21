export interface About {
  paragraphs: string[];
  interests: string[];
  short: string[];
}

export const about: About = {
  paragraphs: [
    "I am a researcher in mathematical optimization, with a background in chemical engineering. My work focuses on mathematical programming models for large-scale, structured problems and on the algorithms used to solve them.",
    "I am particularly interested in the mathematical structure underlying these problems and in how quantum and hybrid quantum-classical algorithms can exploit that structure to obtain better formulations and solutions. My current research interests are:",
  ],
  interests: [
    "Optimization and operations research, including the algebraic and combinatorial structure of mathematical programs and symmetry reduction,",
    "Quantum algorithms: hybrid quantum-classical methods, quantum machine learning, and quantum annealing,",
    "Applications in energy systems, process systems engineering, and large-scale optimization.",
  ],
  short: [
    "Hi, I'm Isaac. I work on mathematical optimization, with a background in chemical engineering.",
    "My research focuses on mathematical programming and its structure, quantum and hybrid quantum-classical algorithms, and machine learning, with applications in energy and process systems.",
  ],
};
