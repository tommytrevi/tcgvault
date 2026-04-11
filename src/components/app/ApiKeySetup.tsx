import { useState } from 'react';
import { createClient } from '../../lib/client';
import { setApiKey } from '../../lib/storage';

interface Props {
  onKeySet: (key: string) => void;
}

export default function ApiKeySetup({ onKeySet }: Props) {
  const [inputKey, setInputKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleValidate = async () => {
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your API key.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const client = createClient(trimmed);
      // Validate by calling games.list()
      await client.games.list();
      setApiKey(trimmed);
      setStatus('success');
      setTimeout(() => onKeySet(trimmed), 600);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error && err.message.includes('401')
          ? 'Invalid API key. Please check and try again.'
          : err instanceof Error
          ? err.message
          : 'Failed to validate API key. Please try again.'
      );
    }
  };

  return (
    <div style={{
      maxWidth: '32rem',
      margin: '4rem auto',
      padding: '0 1rem',
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '2rem',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: '6px',
            padding: '4px 12px',
            marginBottom: '1rem',
          }}>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontFamily: 'var(--font-family-mono)' }}>
              BYOK — Bring Your Own Key
            </span>
          </div>
          <h1 style={{
            color: 'var(--color-text-heading)',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}>
            Enter your API key
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Get a free API key from{' '}
            <a
              href="https://tcgpricelookup.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
            >
              tcgpricelookup.com/pricing
            </a>
            . Setup guide at{' '}
            <a
              href="https://tcgfast.com/docs/getting-started/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
            >
              tcgfast.com/docs
            </a>
            .
          </p>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-family-mono)',
          }}>
            API KEY
          </label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            placeholder="tcglookup_..."
            style={{
              width: '100%',
              backgroundColor: 'var(--color-bg)',
              border: `1px solid ${status === 'error' ? '#ff4444' : status === 'success' ? 'var(--color-accent)' : 'var(--color-border)'}`,
              borderRadius: '8px',
              padding: '10px 14px',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Error message */}
        {status === 'error' && errorMsg && (
          <div style={{
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            borderRadius: '6px',
            padding: '10px 14px',
            color: '#ff6b6b',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}>
            {errorMsg}
          </div>
        )}

        {/* Success message */}
        {status === 'success' && (
          <div style={{
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            borderRadius: '6px',
            padding: '10px 14px',
            color: 'var(--color-accent)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            API key validated! Loading your vault...
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleValidate}
          disabled={status === 'loading' || status === 'success'}
          style={{
            width: '100%',
            backgroundColor: status === 'success' ? 'var(--color-accent-dim)' : 'var(--color-accent)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            padding: '11px',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
            transition: 'opacity 0.15s',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          {status === 'loading' ? 'Validating...' : status === 'success' ? 'Key Validated!' : 'Validate & Save Key'}
        </button>

        {/* Privacy notice */}
        <div style={{
          marginTop: '1.25rem',
          padding: '10px 14px',
          backgroundColor: 'rgba(136, 136, 136, 0.08)',
          borderRadius: '6px',
          border: '1px solid var(--color-border)',
        }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>Privacy:</strong> Your API key is stored in your browser's localStorage. It is never sent to any server other than <strong>tcgpricelookup.com</strong>. TCGVault has no backend.
          </p>
        </div>
      </div>
    </div>
  );
}
