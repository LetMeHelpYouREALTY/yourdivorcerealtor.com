import Link from 'next/link';
import { SectionHeader } from '@/components/layouts/SectionHeader';
import { messaging } from '@/lib/messaging';

export function DivorceOptions() {
  const options = [
    {
      title: 'Sell and Split Proceeds',
      description: messaging.options.sell,
      icon: '💰',
      href: '/selling-home-during-divorce',
    },
    {
      title: 'Buyout Option',
      description: messaging.options.buyout,
      icon: '🏠',
      href: '/divorce-buyout-options',
    },
    {
      title: 'Co-Own Temporarily',
      description: messaging.options.coOwn,
      icon: '🤝',
      href: '/divorce-settlement-options',
    },
    {
      title: 'Refinance',
      description: messaging.options.refinance,
      icon: '📊',
      href: '/refinancing-after-divorce',
    },
    {
      title: 'Short Sale',
      description: messaging.options.shortSale,
      icon: '📉',
      href: '/divorce-settlement-options',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Know Your Options"
          description="Five ways to settle the marital home. Each one changes the cash, the loan, and the timeline differently."
        />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {options.map(option => (
            <Link
              key={option.title}
              href={option.href}
              className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:border-blue-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <div className="mb-4 text-3xl sm:text-4xl" aria-hidden>{option.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">{option.title}</h3>
              <p className="mb-4 flex-1 leading-relaxed text-gray-600">{option.description}</p>
              <span className="font-semibold text-blue-600 hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
