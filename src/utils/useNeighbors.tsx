import type { YearPageNeighbor, ClubPageNeighbor } from '../../types';

function isClubPage(neighbor: YearPageNeighbor | ClubPageNeighbor): neighbor is ClubPageNeighbor {
  return neighbor?.mode === 'club';
}
function neighborToNav(neighbor?: YearPageNeighbor | ClubPageNeighbor) {
  if (!neighbor) return null;
  if (isClubPage(neighbor)) {
    return {
      to: neighbor.node.href,
      title: neighbor.node.name,
    };
  }
  return {
    to: neighbor.node.href,
    title: `${neighbor.node.year}年`,
  };
}

type UseNeighborProps = {
  previous?: YearPageNeighbor | ClubPageNeighbor;
  next?: YearPageNeighbor | ClubPageNeighbor;
};

function useNeighbor({ previous, next }: UseNeighborProps): {
  previous: { to: string; title: string } | null;
  next: { to: string; title: string } | null;
} {
  return {
    previous: neighborToNav(previous),
    next: neighborToNav(next),
  };
}

export default useNeighbor;
