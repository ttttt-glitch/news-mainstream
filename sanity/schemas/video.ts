export default {
  name: 'video',
  title: 'Video Stories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste the full YouTube watch link here',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
} as const;