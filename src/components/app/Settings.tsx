import { useState } from 'react';
import { clearCollection } from '../../lib/storage';

interface Props {
  onCollectionCleared: () => void;
}

export default function Settings({ onCollectionCleared }: Props) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearCollection = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearCollection();
    onCollectionCleared();
    setConfirmClear(false);
  };

  return (
    <div style={{ maxWidth: '36rem' }}>
      <h2 style={{ color: 'var(--color-text-heading)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        Settings
      </h2>

      {/* API Key info section */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}>
        <h3 style={{ color: 'var(--color-text-heading)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
          API Key
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.625rem',
          backgroundColor: 'rgba(0, 255, 136, 0.05)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          borderRadius: '8px',
          padding: '0.875rem 1rem',
          marginBottom: '0.75rem',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            API key is configured via the <code style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-accent)', fontSize: '0.8rem' }}>TCG_API_KEY</code> environment variable on the server. It is never exposed to the browser.
          </p>
        </div>
        <a
          href="https://tcgfast.com/docs/getting-started/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-accent)', fontSize: '0.85rem', textDecoration: 'none' }}
        >
          Setup guide →
        </a>
      </div>

      {/* Clear collection */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}>
        <h3 style={{ color: 'var(--color-text-heading)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
          Clear Collection
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          Permanently delete all cards from your collection. This cannot be undone. Export first if you need a backup.
        </p>
        <button
          onClick={handleClearCollection}
          style={{
            backgroundColor: confirmClear ? 'rgba(255,68,68,0.15)' : 'transparent',
            border: `1px solid ${confirmClear ? 'rgba(255,68,68,0.5)' : 'rgba(255,68,68,0.3)'}`,
            borderRadius: '6px',
            padding: '7px 14px',
            color: '#ff6b6b',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          {confirmClear ? 'Click again to confirm' : 'Clear Collection'}
        </button>
        {confirmClear && (
          <button
            onClick={() => setConfirmClear(false)}
            style={{
              marginLeft: '0.5rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '7px 14px',
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-sans)',
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Links */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem',
      }}>
        <h3 style={{ color: 'var(--color-text-heading)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
          Resources
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="https://tcgpricelookup.com/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', textDecoration: 'none' }}>
            Get API key — tcgpricelookup.com/pricing
          </a>
          <a href="https://tcgfast.com/docs/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', textDecoration: 'none' }}>
            API documentation — tcgfast.com/docs
          </a>
          <a href="https://github.com/TCG-Price-Lookup/tcgvault" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', textDecoration: 'none' }}>
            TCGVault on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
