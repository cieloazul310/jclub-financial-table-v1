import * as React from 'react';
import { navigate } from 'gatsby';
import NativeSelect from '@mui/material/NativeSelect';
import { AppLinkButton, useIsMobile } from '@cieloazul310/gatsby-theme-aoi';
import { useClubsByCategory } from '../../utils/graphql-hooks';
import type { Club, Category } from '../../../types';

type CategoryLinkCoreProps = {
  title: string;
  clubs: Pick<Club, 'id' | 'short_name' | 'href'>[];
};

export function CategoryLinkCore({ title, clubs }: CategoryLinkCoreProps) {
  const isMobile = useIsMobile();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };

  if (isMobile) {
    return (
      <NativeSelect value="" onChange={onChange}>
        <option disabled value="">
          {title}
        </option>
        {clubs.map(({ id, href, short_name }) => (
          <option key={id} value={href}>
            {short_name}
          </option>
        ))}
      </NativeSelect>
    );
  }

  return (
    <>
      {clubs.map((node, index) => (
        <AppLinkButton key={node.id ?? index} href={node.href} color="inherit">
          {node.short_name}
        </AppLinkButton>
      ))}
    </>
  );
}

export function J1Link() {
  const { j1 } = useClubsByCategory();
  return <CategoryLinkCore title="J1クラブ経営情報" clubs={j1.nodes} />;
}

export function J2Link() {
  const { j2 } = useClubsByCategory();
  return <CategoryLinkCore title="J2クラブ経営情報" clubs={j2.nodes} />;
}

export function J3Link() {
  const { j3 } = useClubsByCategory();
  return <CategoryLinkCore title="J3クラブ経営情報" clubs={j3.nodes} />;
}

export function CategoryLink({ category }: { category: Category }) {
  if (category === 'J1') return <J1Link />;
  if (category === 'J2') return <J2Link />;
  if (category === 'J3') return <J3Link />;
  return null;
}
