type KeyFact = {
  label: string;
  value: string;
};

type KeyFactsProps = {
  title?: string;
  facts: KeyFact[];
  /** Attribution line, e.g. "Las Vegas REALTORS®, September 2026". */
  source: string;
  sourceUrl?: string;
};

/**
 * Compact fact table with a visible source line.
 * Every figure must come from src/lib/market-data.ts so the attribution is true.
 */
export function KeyFacts({ title = 'Key numbers', facts, source, sourceUrl }: KeyFactsProps) {
  return (
    <section aria-label={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {facts.map(fact => (
          <div key={fact.label} className="rounded-lg bg-gray-50 p-4">
            <dt className="text-sm text-gray-600">{fact.label}</dt>
            <dd className="mt-1 text-2xl font-bold text-blue-700">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-gray-500">
        Source:
        {' '}
        {sourceUrl
          ? (
              <a href={sourceUrl} className="underline hover:text-blue-700" rel="noopener noreferrer" target="_blank">{source}</a>
            )
          : source}
      </p>
    </section>
  );
}
