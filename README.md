# asim-aa.github.io
Personal portfolio — machine learning &amp; data science work.

## EDS 124 Teaching Programming Portfolio

The public page is `teaching-programming.html`. Edit only the arrays in
`teaching-content.js` to add course work. Keep values as quoted JavaScript
strings and add a comma between entries. Leave an array empty to show its
intentional placeholder. Use published, publicly accessible links for visitors.

```js
const teachingContent = {
  projects: [{
    title: 'Actual project title', description: 'What I built or learned',
    week: 'Week 2', tools: ['Scratch'],
    image: 'shots/my-project.jpg', imageAlt: 'Description of the image',
    url: 'https://example.com/project', github: 'https://github.com/…',
    scratch: 'https://scratch.mit.edu/projects/…',
    snap: 'https://snap.berkeley.edu/project?…',
    video: 'https://youtu.be/…', reflection: 'https://example.com/reflection'
  }],
  videos: [{
    title: 'Actual demonstration', topic: 'Loops', description: 'What it covers',
    url: 'https://youtu.be/…', reflection: 'https://example.com/reflection'
    // Optional: embedId: 'YouTube11Id' embeds a YouTube video on the page.
  }],
  reflections: [{
    title: 'Actual reflection title', date: 'Oct 2026',
    text: 'A short reflection can live directly here.',
    url: 'https://example.com/full-reflection' // Optional.
  }],
  resources: [{
    title: 'Actual material title', type: 'Google Slides',
    description: 'What the resource contains',
    url: 'https://docs.google.com/presentation/d/…', linkLabel: 'Open Slides'
  }]
};
```

The same resource fields work for a Google Doc, Scratch or Snap link: change
`type`, `url`, and `linkLabel` (for example, `Open Document` or `View Snap Project`).
Only add entries for work that exists. External links open in a new tab. Images
should be placed in this repository because the page's content security policy
limits images to local files. The page uses site CSS and JavaScript without a build step.
