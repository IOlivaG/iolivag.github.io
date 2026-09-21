export const lastUpdated = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format(new Date());

export const site = {
  name: "Isaac Oliva-González",
  shortName: "I. Oliva-González",
  email: "isaac.oliva23@gmail.com",
  homepage: "https://iolivag.github.io",
  publicationsUrl: "https://iolivag.github.io/publications/",
  cvUrl: "https://github.com/IOlivaG/IOlivaG/blob/main/IsaacOlivaCV.pdf",
  social: {
    scholar: "https://scholar.google.com/citations?user=QosJQjUAAAAJ",
    orcid: "https://orcid.org/0009-0006-2174-8861",
    github: "https://github.com/IOlivaG",
    linkedin: "https://www.linkedin.com/in/isaacoliva23/",
  },
};
