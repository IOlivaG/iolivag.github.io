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
    `<a href="${site.cvUrl}">CV</a>`,
    `<a href="${site.social.scholar}">Google Scholar</a>`,
    `<a href="${site.social.orcid}">ORCID</a>`,
    `<a href="${site.social.linkedin}">LinkedIn</a>`,
    `<a href="${site.social.github}">GitHub</a>`,
    `<a href="${site.homepage}">Personal website</a>`,
  ].join('&nbsp;&nbsp;·&nbsp;&nbsp;');

  const projectsBlock = projects
    .map(project => `- [**${project.title}**](${project.url}), ${project.description}`)
    .join('\n');

  const publicationsBlock = featuredPublications
    .map(pub => {
      const title = pub.links.paper ? `[${pub.title}](${pub.links.paper})` : pub.title;
      return `- **${title}** - *${venueLabel[pub.category]}*`;
    })
    .join('\n\n');

  const readme = `# ${site.name}

<p align="center">
  ${linksBlock}
</p>

${aboutBlock}

## Research Interests

${interestsBlock}

## Projects

Here are some things I've been working on:

${projectsBlock}

## Featured Research

${publicationsBlock}

> For a complete list, see the [publications section](${site.publicationsUrl}) of my [personal website](${site.homepage}).
`;

  return new Response(readme, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
