export interface Project {
  title: string;
  url: string;
  description: string;
}

export const projects: Project[] = [
  {
    title: "Exploratory Study of Symmetry in Combinatorial Optimization",
    url: "https://github.com/IOlivaG/Symmetry-reduction-combinatorial-optimization",
    description: "Symmetry reduction for integer linear programs: lexicographic constraints, variable fixing, and automorphism-based methods applied to shortest path, graph coloring, max-cut, and TSP.",
  },
  {
    title: "Symmetry-Aware CC Unit Commitment",
    url: "https://github.com/IOlivaG/CC-MUCP-symmetry-reduction",
    description: "Symmetry reduction for the CC-MUCP via demand-aware lexicographic constraints on gas turbines within each package, lowering the number of equivalent optimal schedules while keeping packages distinct.",
  },
  {
    title: "Corrugator Production Scheduling",
    url: "https://github.com/IOlivaG/corrugator-production-scheduling",
    description: "Mixed-integer programming for corrugator scheduling: groups orders into cutting patterns over discrete roll widths, minimizing setups under trim-waste and line-balance constraints.",
  },
];
