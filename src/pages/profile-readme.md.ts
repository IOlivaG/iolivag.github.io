import type { APIRoute } from 'astro';
import { featuredPublications, venueLabel } from '../data/publications';
import { projects } from '../data/projects';
import { about } from '../data/about';
import { site } from '../data/site';

export const GET: APIRoute = () => {
  const aboutBlock = about.short.join('\n\n');

  const interestsBlock = about.interests
    .map(interest => `- ${interest}`)
    .join('\n');

  const linksBlock = [
    `[CV (PDF)](${site.cvUrl})`,
    `[Google Scholar](${site.social.scholar})`,
    `[ORCID](${site.social.orcid})`,
    `[LinkedIn](${site.social.linkedin})`,
    `[GitHub](${site.social.github})`,
    `[Personal website](${site.homepage})`,
  ].join(' · ');

  const projectsBlock = projects
    .map(project => `- [**${project.title}**](${project.url}), ${project.description}`)
    .join('\n');

  const publicationsBlock = featuredPublications
    .map(pub => {
      const title = pub.links.paper ? `[${pub.title}](${pub.links.paper})` : pub.title;
      return `- **${title}** — *${venueLabel[pub.category]}*`;
    })
    .join('\n\n');

  const readme = `# ${site.name}

${linksBlock}

${aboutBlock}

## Research Interests

${interestsBlock}

## Projects

Here are some things I've been working on:

${projectsBlock}

## Publications

I'm early in my research career, so the list is still short, but growing.

${publicationsBlock}

> For a complete list, see the [publications section](${site.publicationsUrl}) of my [personal website](${site.homepage}).
`;

  return new Response(readme, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
