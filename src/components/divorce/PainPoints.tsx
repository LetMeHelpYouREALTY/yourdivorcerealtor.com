import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { SectionHeader } from '@/components/layouts/SectionHeader';
import { messaging } from '@/lib/messaging';

export function PainPoints() {
  return (
    <section className="bg-blue-50/70 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Questions Keeping You Up at Night?"
          description="These are the four questions that come up first on almost every call. Each has an answer with a number attached."
        />

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {messaging.painPoints.map(point => (
            <div
              key={point}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm ring-1 ring-blue-50 transition-all hover:border-blue-200 hover:shadow-md"
            >
              <p className="text-lg leading-snug font-semibold text-pretty text-gray-800">{point}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 text-lg font-medium text-gray-800 sm:text-xl">
            {messaging.ctas.urgency}
          </p>
          <CalendlyLink
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            {messaging.ctas.primary}
          </CalendlyLink>
        </div>
      </div>
    </section>
  );
}
