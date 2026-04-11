import { useState } from 'react';
import type { CollectionItem } from '../../lib/types';
import { exportCollectionAsJSON, exportCollectionAsCSV } from '../../lib/storage';

interface Props {
  collection: CollectionItem[];
}

export default function ExportMenu({ collection }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '7px',
          padding: '7px 14px',
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-family-sans)',
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'var(--color-text)';
          e.currentTarget.style.borderColor = 'var(--color-text-muted)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'var(--color-text-muted)';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 6px)',
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.375rem',
            minWidth: '160px',
            zIndex: 20,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <button
              onClick={() => { exportCollectionAsJSON(collection); setOpen(false); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '8px 12px',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-family-sans)',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.8rem', color: 'var(--color-accent)' }}>{ }</span>
              Download JSON
            </button>
            <button
              onClick={() => { exportCollectionAsCSV(collection); setOpen(false); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '8px 12px',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-family-sans)',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.8rem', color: 'var(--color-accent)' }}>,</span>
              Download CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
