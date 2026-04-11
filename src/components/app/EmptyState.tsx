interface Props {
  onGoSearch: () => void;
}

export default function EmptyState({ onGoSearch }: Props) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '5rem 2rem',
      maxWidth: '28rem',
      margin: '0 auto',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        margin: '0 auto 1.25rem',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-border)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <h2 style={{ color: 'var(--color-text-heading)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
        Your collection is empty
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Search for cards and add them to start tracking your collection value.
      </p>
      <button
        onClick={onGoSearch}
        style={{
          backgroundColor: 'var(--color-accent)',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-family-sans)',
        }}
      >
        Search Cards
      </button>
    </div>
  );
}
