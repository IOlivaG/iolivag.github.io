import type { APIRoute } from 'astro';
import { featuredPublications, venueLabel } from '../data/publications';
import { projects } from '../data/projects';
import { about } from '../data/about';
import { site } from '../data/site';

export const GET: APIRoute = () => {
  const aboutBlock = about.short.join('\n\n');

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

${aboutBlock}

## Projects

Here are some things I've been working on:

${projectsBlock}

## Publications

I'm early in my research career, so the list is still short, but growing. Selected publications are listed below. For a complete list, see the [publications section](${site.publicationsUrl}) of my [homepage](${site.homepage}).

${publicationsBlock}

## Links

[CV](${site.cvUrl}) · [Google Scholar](${site.social.scholar}) · [LinkedIn](${site.social.linkedin}) · [Homepage](${site.homepage})
`;

  return new Response(readme, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
