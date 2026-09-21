export const lastUpdated = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format(new Date());
