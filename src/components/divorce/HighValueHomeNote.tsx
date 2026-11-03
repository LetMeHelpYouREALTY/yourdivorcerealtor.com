import type { ReactNode } from 'react';

type HighValueHomeNoteProps = {
  title?: string;
  /** Three to five short bullets specific to homes above the 2026 jumbo line. */
  points: ReactNode[];
};

/**
 * Luxury-specific considerations block. Used on every page so a $2M+ owner
 * sees what changes at their price point: jumbo financing, appraisal spread,
 * club memberships, guard-gated showing rules, privacy.
 */
export function HighValueHomeNote({ title = 'If your home is worth $1 million or more', points }: HighValueHomeNoteProps) {
  return (
    <section aria-label={title} className="rounded-xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="mb-3 text-xl font-bold text-gray-900">{title}</h2>
      <ul className="list-disc space-y-2 pl-5 text-gray-800">
        {points.map((point, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
