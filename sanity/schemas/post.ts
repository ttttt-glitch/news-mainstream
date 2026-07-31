import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'News Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'titleSo',
      title: 'Title (Somali)',
      type: 'string',
    }),
    defineField({
      name: 'bodyEn',
      title: 'Body (English)',
      type: 'blockContent',
    }),
    defineField({
      name: 'bodySo',
      title: 'Body (Somali)',
      type: 'blockContent',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Somali', value: 'so' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'image', title: 'Image', type: 'image' },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tech', value: 'tech' },
          { title: 'Business', value: 'BUSINESS' },
          { title: 'Sports', value: 'SPORTS' },
          { title: 'World', value: 'WORLD' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'isBreaking',
      title: 'Is Breaking News?',
      type: 'boolean',
      initialValue: false,
    }),
    // ✅ NEW: YouTube Video Field - Add this section
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste the full YouTube link (e.g., https://www.youtube.com/watch?v=abc123)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true; // Optional field
          const pattern = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
          return pattern.test(url) || 'Must be a valid YouTube URL';
        }),
    }),
  ],
});