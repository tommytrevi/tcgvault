import { useEffect } from 'react';
import type { Card } from '@tcgpricelookup/sdk';
import { CONDITION_LABELS } from '../../lib/types';
import type { Condition } from '../../lib/types';

interface Props {
  card: Card;
  onClose: () => void;
}

export default function CardDetail({ card, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const rawPrices = card.prices.raw;
  const conditions: Condition[] = ['near_mint', 'lightly_played', 'moderately_played', 'heavily_played', 'damaged'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        maxWidth: '36rem',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '0.8rem',
          }}
        >
          ESC
        </button>

        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {card.image_url && (
            <img
              src={card.image_url}
              alt={card.name}
              style={{ width: '100px', borderRadius: '8px', objectFit: 'contain', backgroundColor: '#111', flexShrink: 0 }}
            />
          )}
          <div>
            <div style={{ color: 'var(--color-accent)', fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', marginBottom: '0.25rem' }}>
              {card.game.name}
            </div>
            <h2 style={{ color: 'var(--color-text-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {card.name}
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              {card.set.name} {card.number ? '· #' + card.number : ''}
            </div>
            {card.rarity && (
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                {card.rarity}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            color: 'var(--color-text-heading)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-family-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Price by Condition (TCGPlayer)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {conditions.map(function(condition) {
              const condPrices = rawPrices[condition];
              const tcp = condPrices?.tcgplayer;
              return (
                <div key={condition} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                }}>
                  <span style={{ color: 'var(--color-text)', fontSize: '0.875rem' }}>
                    {CONDITION_LABELS[condition]}
                  </span>
                  <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-family-mono)', fontSize: '0.85rem' }}>
                    {tcp ? (
                      <span>
                        {tcp.market != null ? (
                          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>${tcp.market.toFixed(2)}</span>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)' }}>N/A</span>
                        )}
                        {tcp.low != null ? (
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}> / low ${tcp.low.toFixed(2)}</span>
                        ) : null}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>No data</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          padding: '0.75rem',
          backgroundColor: 'var(--color-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)' }}>ID: {card.id}</span>
        </div>
      </div>
    </div>
  );
}
