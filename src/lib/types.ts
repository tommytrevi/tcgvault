import type { GameSlug } from '@tcgpricelookup/sdk';

export type Condition =
  | 'near_mint'
  | 'lightly_played'
  | 'moderately_played'
  | 'heavily_played'
  | 'damaged';

export const CONDITION_LABELS: Record<Condition, string> = {
  near_mint: 'Near Mint',
  lightly_played: 'Lightly Played',
  moderately_played: 'Moderately Played',
  heavily_played: 'Heavily Played',
  damaged: 'Damaged',
};

export const CONDITIONS: Condition[] = [
  'near_mint',
  'lightly_played',
  'moderately_played',
  'heavily_played',
  'damaged',
];

export interface CollectionItem {
  id: string;
  name: string;
  game: string;
  set: string;
  setCode: string;
  number: string;
  quantity: number;
  condition: Condition;
  addedAt: string;
  cachedPrice?: number;
  imageUrl?: string;
}

export interface GameOption {
  id: GameSlug;
  label: string;
}

export const GAMES: GameOption[] = [
  { id: 'pokemon', label: 'Pokemon' },
  { id: 'mtg', label: 'MTG' },
  { id: 'yugioh', label: 'Yu-Gi-Oh!' },
  { id: 'lorcana', label: 'Lorcana' },
  { id: 'onepiece', label: 'One Piece' },
  { id: 'swu', label: 'Star Wars' },
  { id: 'fab', label: 'Flesh & Blood' },
  { id: 'pokemon-jp', label: 'Pokemon JP' },
];

export type AppView = 'search' | 'collection' | 'settings';
