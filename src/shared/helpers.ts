import { RickAndMortyCardProps } from './interfaces';

type SortProps = {
  sortedPosts: RickAndMortyCardProps[];
  selectValue?: string;
};
export const sortCards = ({ sortedPosts, selectValue }: SortProps) => {
  const key = selectValue as keyof RickAndMortyCardProps;
  return [...sortedPosts].sort((a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
    (a[key] || '') > (b[key] || '') ? 1 : -1
  );
};
