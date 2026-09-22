export interface Project {
  title: string;
  url: string;
  description: string;
}

export const projects: Project[] = [
  {
    title: "Exploratory Study of Symmetry in Combinatorial Optimization",
    url: "https://github.com/IOlivaG/Symmetry-reduction-combinatorial-optimization",
    description: "Explores symmetry reduction techniques including lexicographic constraints, variable fixing, and automorphism-based methods applied to classical ILP problems such as shortest path, graph coloring, max-cut, and traveling salesman, reducing redundant solutions and simplifying the solution space.",
  },
  {
    title: "Symmetry-Aware CC Unit Commitment",
    url: "https://github.com/IOlivaG/CC-MUCP-symmetry-reduction",
    description: "Study of symmetry reduction applied to the Combined Cycle Min-Up/Min-Down Unit Commitment Problem (CC-MUCP), deriving demand-aware lexicographic constraints to eliminate the wreath product symmetry induced by identical packages and gas turbines.",
  },
  {
    title: "SDP-Symresack: Symmetry Handling in SDP",
    url: "https://github.com/IOlivaG/sdp-symresack-maxcut",
    description: "Explores whether lexicographic ordering from symresacks can be adapted from binary integer programming to semidefinite programming, using MaxCut on K3 as a worked example.",
  },
  {
    title: "Corrugator Production Scheduling",
    url: "https://github.com/IOlivaG/corrugator-production-scheduling",
    description: "Mixed-integer programming model for corrugator production scheduling. Groups compatible orders into cutting patterns over discrete roll widths, minimizing setups subject to a trim-waste cap and a line-balance constraint.",
  },
];
