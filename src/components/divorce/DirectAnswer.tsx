import type { ReactNode } from 'react';

type DirectAnswerProps = {
  /** The question this page answers, shown as a small label. */
  question: string;
  /** A 40 to 80 word answer that stands on its own. */
  children: ReactNode;
};

/**
 * Citation-ready lead paragraph placed directly under the H1.
 * Answer engines and AI Overviews lift the first self-contained answer on a page;
 * this block makes that answer explicit and visible to readers.
 */
export function DirectAnswer({ question, children }: DirectAnswerProps) {
  return (
    <section
      aria-label="Short answer"
      className="rounded-xl border-l-4 border-blue-600 bg-blue-50 px-6 py-5 text-gray-900"
    >
      <p className="mb-2 text-xs font-semibold tracking-wide text-blue-700 uppercase">{question}</p>
      <p className="text-lg leading-relaxed">{children}</p>
    </section>
  );
}
