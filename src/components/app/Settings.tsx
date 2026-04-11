import { useState } from 'react';
import { getApiKey, removeApiKey, clearCollection, setApiKey } from '../../lib/storage';
import { createClient, resetClient } from '../../lib/client';

interface Props {
  onApiKeyRemoved: () => void;
  onCollectionCleared: () => void;
}

export default function Settings({ onApiKeyRemoved, onCollectionCleared }: Props) {
  const currentKey = getApiKey() ?? '';
  const maskedKey = currentKey.length > 8
    ? currentKey.slice(0, 8) + '•'.repeat(Math.min(currentKey.length - 8, 20))
    : '••••••••';

  const [confirmClear, setConfirmClear] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [changingKey, setChangingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [keyError, setKeyError] = useState('');

  const handleClearCollection = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearCollection();
    onCollectionCleared();
    setConfirmClear(false);
  };

  const handleChangeKey = async () => {
    const trimmed = newKey.trim();
    if (!trimmed) return;
    setKeyStatus('loading');
    setKeyError('');
    try {
      const client = createClient(trimmed);
      await client.games.list();
      setApiKey(trimmed);
      setKeyStatus('success');
      setChangingKey(false);
      setNewKey('');
      setTimeout(() => setKeyStatus('idle'), 2000);
    } catch (err) {
      setKeyStatus('error');
      setKeyError(err instanceof Error ? err.message : 'Invalid key');
    }
  };

  const handleRemoveKey = () => {
    removeApiKey();
    resetClient();
    onApiKeyRemoved();
  };

  return (
    <div style={{ maxWidth: '36rem' }}>
      <h2 style={{ color: 'var(--color-text-heading)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        Settings
      </h2>

      {/* API Key section */}
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
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          Your key is stored only in localStorage and sent only to tcgpricelookup.com.
        </div>

        <div style={{
          fontFamily: 'var(--font-family-mono)',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          padding: '8px 12px',
          marginBottom: '1rem',
        }}>
          {maskedKey}
        </div>

        {!changingKey ? (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setChangingKey(true)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '7px 14px',
                color: 'var(--color-text)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-sans)',
              }}
            >
              Change Key
            </button>
            <button
              onClick={handleRemoveKey}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,68,68,0.3)',
                borderRadius: '6px',
                padding: '7px 14px',
                color: '#ff6b6b',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-sans)',
              }}
            >
              Remove Key
            </button>
          </div>
        ) : (
          <div>
            <input
              type="password"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="New API key..."
              style={{
                width: '100%',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '0.5rem',
              }}
            />
            {keyStatus === 'error' && (
              <div style={{ color: '#ff6b6b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{keyError}</div>
            )}
            {keyStatus === 'success' && (
              <div style={{ color: 'var(--color-accent)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Key updated!</div>
            )}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleChangeKey}
                disabled={keyStatus === 'loading'}
                style={{
                  backgroundColor: 'var(--color-accent)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family-sans)',
                }}
              >
                {keyStatus === 'loading' ? 'Validating...' : 'Save New Key'}
              </button>
              <button
                onClick={() => { setChangingKey(false); setNewKey(''); setKeyStatus('idle'); }}
                style={{
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
            </div>
          </div>
        )}
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
          <a href="https://tcgfast.com/docs/sdks/javascript/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', textDecoration: 'none' }}>
            JavaScript SDK reference
          </a>
          <a href="https://github.com/TCG-Price-Lookup/tcgvault" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.875rem', textDecoration: 'none' }}>
            TCGVault on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
