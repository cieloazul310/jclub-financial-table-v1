import { useStaticQuery, graphql } from 'gatsby';
import type { Dict } from '../../../types';

export default function useDictionary() {
  const { dictionary } = useStaticQuery<{ dictionary: Dict }>(graphql`
    {
      dictionary
    }
  `);
  return dictionary;
}
