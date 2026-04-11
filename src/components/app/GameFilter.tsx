import type { GameSlug } from '@tcgpricelookup/sdk';
import { GAMES } from '../../lib/types';

interface Props {
  selectedGame: GameSlug | '';
  onGameChange: (game: GameSlug | '') => void;
}

export default function GameFilter({ selectedGame, onGameChange }: Props) {
  return (
    <select
      value={selectedGame}
      onChange={(e) => onGameChange(e.target.value as GameSlug | '')}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '10px 14px',
        color: selectedGame ? 'var(--color-text)' : 'var(--color-text-muted)',
        fontFamily: 'var(--font-family-sans)',
        fontSize: '0.9rem',
        cursor: 'pointer',
        outline: 'none',
        flexShrink: 0,
      }}
    >
      <option value="">All games</option>
      {GAMES.map(game => (
        <option key={game.id} value={game.id}>{game.label}</option>
      ))}
    </select>
  );
}
