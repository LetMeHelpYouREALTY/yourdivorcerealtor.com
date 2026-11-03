/**
 * Optimized Divorce Process Component
 * - Server Component (no client-side JavaScript needed)
 * - CSS animations for visual appeal
 * - Semantic HTML for accessibility
 * - Mobile-responsive timeline
 */
import { SectionHeader } from '@/components/layouts/SectionHeader';
import { messaging } from '@/lib/messaging';

export function DivorceProcess() {
  const steps = [
    {
      number: 1,
      title: messaging.process.step1,
      description: 'A private 15-minute call: where the case stands, who is on title and on the loan, and what each of you needs from the house.',
    },
    {
      number: 2,
      title: messaging.process.step2,
      description: 'A written valuation with comparable sales, the loan payoff, and your net equity. Above the jumbo line, a second opinion is standard.',
    },
    {
      number: 3,
      title: messaging.process.step3,
      description: 'Sell, buy out, co-own for a set period, or refinance. Each option gets a number and a date so you can compare them.',
    },
    {
      number: 4,
      title: messaging.process.step4,
      description: 'A plan both attorneys can sign off on: list price, showing rules, sign-off deadlines, and who pays what until close.',
    },
    {
      number: 5,
      title: messaging.process.step5,
      description: 'The listing runs on the schedule. Both spouses and both attorneys get the same update on the same day.',
    },
    {
      number: 6,
      title: messaging.process.step6,
      description: 'Escrow disburses per the decree or settlement, deeds record, and you know your move-out date before you sign.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Six Steps, Each With a Date"
          description="You know what happens next before it happens. The same sequence runs whether the house is worth $400,000 or $4 million."
        />

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 hidden w-0.5 bg-blue-200 md:block" />

            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="group process-step relative flex items-start gap-5 sm:gap-6"
                >
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-700 group-hover:shadow-lg">
                    {step.number}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-6 h-6 w-0.5 bg-blue-200 md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
