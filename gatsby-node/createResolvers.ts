import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { CreateResolversArgs } from 'gatsby';
import { Dict } from '../types';

export default async function gatsbyCreateResolvers({ createResolvers }: CreateResolversArgs) {
  const resolvers = {
    Query: {
      dictionary: {
        type: `Dict!`,
        resolve: () => {
          const dict: Dict = yaml.parse(fs.readFileSync(path.resolve(__dirname, '../data/frames/dict.yml'), 'utf8'));
          return dict;
        },
      },
    },
  };
  createResolvers(resolvers);
}
