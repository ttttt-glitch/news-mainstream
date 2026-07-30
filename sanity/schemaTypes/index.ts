import { type SchemaTypeDefinition } from 'sanity';
import post from '../schemas/post';
import video from '../schemas/video';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    video,
  ],
};