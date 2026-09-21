export type PublicationCategory = 'journal' | 'book' | 'proceedings' | 'presentations';

export interface Publication {
  category: PublicationCategory;
  featured?: number;
  authors: string[];
  title: string;
  year: string;
  status?: string;
  journal?: string;
  publisher?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  conference?: string;
  location?: string;
  issn?: string;
  type?: string;
  doi?: string;
  links: { paper?: string };
  preprint?: boolean;
  preprintLink?: string;
}

export const publications: Publication[] = [
  {
    category: 'book',
    featured: 3,
    authors: ["I. M. Hernández-Romero", "I. Oliva-González", "O. D. Lara-Montaño", "K. Hernández-Romero", "G. G. Esquivel-Patiño" , "O. Kharissova", "A. I. Ramírez", "L. T. González"],
    title: "Integrating Quantum Computing into Sustainable Carbon-Capture Materials Research: Opportunities and Perspectives",
    journal: "Handbook of Carbon Negative Footprint Materials",
    publisher: "Springer, Cham",
    status: "",
    year: "2026",
    doi: "10.1007/978-3-031-87501-4_60-1",
    links: {paper: "https://link.springer.com/10.1007/978-3-031-87501-4_60-1"},
  },
  {
    category: 'journal',
    featured: 1,
    authors: ["I. Oliva-González", "L. T. González", "O. D. Lara-Montaño", "A. I. Ramirez", "A. Mendoza", "I. M. Hernández-Romero"],
    title: "A Hybrid Quantum-Classical Machine Learning Framework for Black Carbon Forecasting",
    journal: "EPJ Quantum Technology",
    status: "",
    year: "2026",
    doi: "10.1140/epjqt/s40507-026-00511-0",
    links: {paper: "https://link.springer.com/article/10.1140/epjqt/s40507-026-00511-0"},
  },
  {
    category: 'journal',
    featured: 2,
    authors: ["I. Oliva-González", "H. Jiménez-Hernández"],
    title: "A QUBO-Driven Simulated Annealing Methodology for Solving the Shortest Path Problem in Urban Transportation Networks",
    journal: "Algorithms",
    status: "",
    year: "2026",
    doi: "10.3390/a19050352",
    links: { paper: "https://www.mdpi.com/1999-4893/19/5/352"},
    preprint: false,
    preprintLink: "https://doi.org/10.20944/preprints202511.0578.v1",
  },
  {
    category: 'proceedings',
    authors: ["I. Oliva-González", "A. G. Romero-Izquierdo", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "S. Hernández"],
    title: "Síntesis de columnas con múltiples paredes divisorias para la separación de combustible sustentable de aviación",
    journal: "Avances en Ingeniería Química",
    volume: "3",
    issue: "1",
    pages: "265–270",
    conference: "Memorias del XLV Encuentro Nacional de la AMIDIQ – Ingeniería de Procesos, Simulación y Control",
    location: "México",
    year: "2024",
    issn: "2683-2925",
    links: { paper: "https://amidiq.com/avances-en-ingenieria-quimica/" },
  },
  {
    category: 'proceedings',
    featured: 4,
    authors: ["I. Oliva-González", "A. G. Romero-Izquierdo", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "S. Hernández"],
    title: "Computer-aided design of intensified separation sequences for a complex mixture of renewable hydrocarbons",
    journal: "Proceedings of the 34th European Symposium on Computer Aided Process Engineering/15th International Symposium of Process Systems Engineering (PSE2024/ESCAPE34)",
    publisher: "Elsevier",
    volume: "53",
    pages: "1483–1488",
    year: "2024",
    doi: "10.1016/B978-0-443-28824-1.50248-9",
    links: { paper: "https://www.sciencedirect.com/science/article/abs/pii/B9780443288241502489" },
  },
  {
    category: 'proceedings',
    authors: ["I. Oliva-González", "A. G. Romero-Izquierdo", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "S. Hernández"],
    title: "Síntesis de columnas con múltiples paredes divisorias para la separación de combustible sustentable de aviación",
    journal: "Avances en Ingeniería Química",
    volume: "2",
    issue: "1",
    pages: "402–407",
    conference: "Memorias del XLIV Encuentro Nacional de la AMIDIQ – Ingeniería de Procesos, Simulación y Control",
    location: "México",
    year: "2023",
    issn: "2683-2925",
    links: { paper: "https://amidiq.com/avances-en-ingenieria-quimica/" },
  },
  {
    category: 'proceedings',
    authors: ["I. Oliva-González", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "E. Quiroz Pérez", "S. Hernández", "A. G. Romero-Izquierdo"],
    title: "Síntesis de secuencias intensificadas de destilación para la separación de una mezcla multicomponente de hidrocarburos renovables",
    journal: "Avances en Ingeniería Química",
    volume: "1",
    issue: "4",
    pages: "218–223",
    conference: "Memorias del XLIII Encuentro Nacional de la AMIDIQ – Ingeniería de Procesos, Simulación y Control",
    location: "México",
    year: "2022",
    issn: "2683-2925",
    links: { paper: "https://amidiq.com/avances-en-ingenieria-quimica/" },
  },
  {
    category: 'presentations',
    authors: ["I. Oliva-González", "A. G. Romero-Izquierdo", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "S. Hernández"],
    title: "Síntesis de columnas con múltiples paredes divisorias para la separación de combustible sustentable de aviación",
    conference: "Retos y Oportunidades al Net-Zero 2030. Encuentro PSPB-FI01",
    location: "Querétaro, México",
    year: "2023",
    type: "Oral presentation",
    links: {},
  },
  {
    category: 'presentations',
    authors: ["I. Oliva-González", "A. G. Romero-Izquierdo", "C. Gutiérrez-Antonio", "F. I. Gómez-Castro", "S. Hernández"],
    title: "Synthesis of alternative intensified sequences for the separation of a multicomponent renewable hydrocarbons mixture",
    conference: "12th International Conference Distillation & Absorption 2022 (DA2022)",
    location: "Toulouse, France",
    year: "2022",
    type: "Poster presentation",
    links: {},
  },
];

export const venueLabel: Record<PublicationCategory, string> = {
  journal: 'Journal Article',
  book: 'Book Chapter',
  proceedings: 'Conference Proceeding',
  presentations: 'Presentation',
};

export const featuredPublications = publications
  .filter((p): p is Publication & { featured: number } => p.featured != null)
  .sort((a, b) => a.featured - b.featured);
