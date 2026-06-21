/**
 * Placeholder gallery. Local gradient fills only — no remote images. One tile
 * carries the "Reemplazar con trabajo real" chip for the owner to swap in.
 */
export function Gallery({ tiles = 6 }: { tiles?: number }) {
  const items = Array.from({ length: tiles });
  return (
    <div className="gallery-grid">
      {items.map((_, i) => {
        const tall = i === 0;
        const variant = i % 2 === 0 ? "g2" : "g1";
        return (
          <div
            key={i}
            className={`tile ${variant}`}
            style={tall ? { gridRow: "span 2" } : undefined}
          >
            {i === 0 && (
              <span className="replace-chip">Reemplazar con trabajo real</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
