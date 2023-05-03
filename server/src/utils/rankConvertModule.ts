import { Rank } from 'src/entities/enums/rank.enum';

export function rankConvert(userRank: number) {
  if (userRank === 1) return Rank.rank1;
  if (userRank === 2) return Rank.rank2;
  if (userRank === 3) return Rank.rank3;
  if (userRank === 4) return Rank.rank4;
}
