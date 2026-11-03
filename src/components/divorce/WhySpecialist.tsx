import { SectionHeader } from '@/components/layouts/SectionHeader';
import { messaging } from '@/lib/messaging';

export function WhySpecialist() {
  const differentiators = [
    {
      title: 'Neutrality',
      description: messaging.serviceDifferentiators.neutrality,
      icon: '⚖️',
    },
    {
      title: 'Divorce Listing Process',
      description: messaging.serviceDifferentiators.divorceProcess,
      icon: '📋',
    },
    {
      title: 'Communication System',
      description: messaging.serviceDifferentiators.communication,
      icon: '💬',
    },
    {
      title: 'Timeline Transparency',
      description: messaging.serviceDifferentiators.timeline,
      icon: '📅',
    },
    {
      title: 'Sale Sabotage Escalation',
      description: messaging.serviceDifferentiators.escalation,
      icon: '🛡️',
    },
    {
      title: 'Court Appointed',
      description: messaging.serviceDifferentiators.courtAppointed,
      icon: '⚖️',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={messaging.headlines.notUsual}
          description="The house is often the largest line in the settlement. It deserves its own specialist, the same as the custody and support terms do."
        />

        <blockquote className="mx-auto mb-10 max-w-prose rounded-r-xl border-l-4 border-blue-600 bg-white/90 py-4 pr-5 pl-6 text-center text-base leading-relaxed text-gray-800 shadow-sm sm:mb-12 sm:py-5 sm:text-lg">
          <span className="font-medium not-italic">{messaging.warningMessage}</span>
        </blockquote>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-4 text-3xl sm:text-4xl" aria-hidden>{item.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
              <p className="leading-relaxed text-pretty text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
