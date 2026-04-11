import { useState } from 'react';
import type { CollectionItem, Condition } from '../../lib/types';
import { CONDITION_LABELS, GAMES } from '../../lib/types';
import { removeFromCollection, updateCollectionItem } from '../../lib/storage';

interface Props {
  collection: CollectionItem[];
  onCollectionChange: (items: CollectionItem[]) => void;
}

export default function CollectionList({ collection, onCollectionChange }: Props) {
  const [refreshingId, setRefreshingId] = useState<string | null>(null);

  const totalValue = collection.reduce((sum, item) => {
    return sum + (item.cachedPrice ?? 0) * item.quantity;
  }, 0);

  // Group by game
  const byGame = collection.reduce<Record<string, CollectionItem[]>>((acc, item) => {
    if (!acc[item.game]) acc[item.game] = [];
    acc[item.game]!.push(item);
    return acc;
  }, {});

  const getGameLabel = (gameId: string) => {
    return GAMES.find(g => g.id === gameId)?.label ?? gameId;
  };

  const handleRemove = (id: string, condition: string) => {
    const updated = removeFromCollection(id, condition);
    onCollectionChange(updated);
  };

  const handleQuantityChange = (id: string, condition: string, qty: number) => {
    if (qty < 1) return;
    const updated = updateCollectionItem(id, condition, { quantity: qty });
    onCollectionChange(updated);
  };

  const handleRefreshPrice = async (item: CollectionItem) => {
    setRefreshingId(item.id + item.condition);
    try {
      const res = await fetch('/api/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [item.id] }),
      });
      const data = await res.json();
      if (res.ok && data.data?.length > 0) {
        const card = data.data[0];
        const nmPrice = card.prices.raw['near_mint']?.tcgplayer?.market ?? undefined;
        const condPrice = card.prices.raw[item.condition as Condition]?.tcgplayer?.market ?? undefined;
        const updated = updateCollectionItem(item.id, item.condition, {
          cachedPrice: condPrice ?? nmPrice,
        });
        onCollectionChange(updated);
      }
    } catch {
      // silently fail
    } finally {
      setRefreshingId(null);
    }
  };

  return (
    <div>
      {/* Total value banner */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', fontFamily: 'var(--font-family-mono)' }}>
            TOTAL COLLECTION VALUE
          </div>
          <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-family-mono)', fontSize: '2rem', fontWeight: 700 }}>
            ${totalValue.toFixed(2)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            {collection.length} cards · {Object.keys(byGame).length} games
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
            Prices cached from last search
          </div>
        </div>
      </div>

      {/* Per-game groups */}
      {Object.entries(byGame).map(([game, items]) => {
        const gameTotal = items.reduce((s, i) => s + (i.cachedPrice ?? 0) * i.quantity, 0);
        return (
          <div key={game} style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
              <h3 style={{
                color: 'var(--color-text-heading)',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--font-family-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {getGameLabel(game)}
              </h3>
              <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem', fontWeight: 600 }}>
                ${gameTotal.toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {items.map(item => {
                const isRefreshing = refreshingId === item.id + item.condition;
                return (
                  <div
                    key={item.id + item.condition}
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    {/* Card image tiny */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: '32px', height: '44px', objectFit: 'contain', borderRadius: '3px', backgroundColor: '#111', flexShrink: 0 }}
                      />
                    )}

                    {/* Name + set */}
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <div style={{ color: 'var(--color-text-heading)', fontWeight: 500, fontSize: '0.875rem' }}>
                        {item.name}
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        {item.set} {item.number ? '· #' + item.number : ''}
                      </div>
                    </div>

                    {/* Condition */}
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', minWidth: '90px' }}>
                      {CONDITION_LABELS[item.condition]}
                    </div>

                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.condition, item.quantity - 1)}
                        style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        -
                      </button>
                      <span style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-text)', fontSize: '0.875rem', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.condition, item.quantity + 1)}
                        style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', minWidth: '70px' }}>
                      <div style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                        {item.cachedPrice != null ? '$' + (item.cachedPrice * item.quantity).toFixed(2) : 'N/A'}
                      </div>
                      {item.quantity > 1 && item.cachedPrice != null && (
                        <div style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                          ${item.cachedPrice.toFixed(2)} ea
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <button
                        onClick={() => handleRefreshPrice(item)}
                        disabled={isRefreshing}
                        title="Refresh price"
                        style={{
                          background: 'none',
                          border: '1px solid var(--color-border)',
                          borderRadius: '5px',
                          padding: '4px 8px',
                          color: 'var(--color-text-muted)',
                          cursor: isRefreshing ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          opacity: isRefreshing ? 0.5 : 1,
                        }}
                      >
                        {isRefreshing ? '...' : '↻'}
                      </button>
                      <button
                        onClick={() => handleRemove(item.id, item.condition)}
                        title="Remove from collection"
                        style={{
                          background: 'none',
                          border: '1px solid var(--color-border)',
                          borderRadius: '5px',
                          padding: '4px 8px',
                          color: '#ff6b6b',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
