import { type SchemaTypeDefinition } from 'sanity';
import video from '../schemas/video'; // Points up one folder and into schemas/video.ts

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    video,
  ],
};