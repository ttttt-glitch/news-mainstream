import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import video from './sanity/schemas/video'; // ✅ Import video schema

// Keep your existing post schema
const postSchema = {
  name: 'post',
  title: 'News Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tech', value: 'tech' },
          { title: 'Business', value: 'business' },
          { title: 'Sports', value: 'sports' },
          { title: 'World', value: 'world' },
        ],
      },
    },
    { name: 'mainImage', title: 'Main Image', type: 'image' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'isBreaking', title: 'Is Breaking News?', type: 'boolean' },
  ],
};

export default defineConfig({
  name: 'default',
  title: 'News Backend',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gasfh4gg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [postSchema, video], // ✅ ADDED video here
  },
});