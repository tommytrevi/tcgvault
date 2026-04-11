import { useRef } from 'react';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
}

export default function SearchBar({ query, onQueryChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-text-muted)',
          pointerEvents: 'none',
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search cards... (e.g. Charizard, Black Lotus)"
        style={{
          width: '100%',
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '10px 14px 10px 40px',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-family-sans)',
          fontSize: '0.9rem',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
