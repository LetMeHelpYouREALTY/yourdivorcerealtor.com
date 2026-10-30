import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { StructuredData } from '@/components/seo/StructuredData';
import { communities } from '@/lib/communities';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import { generateCarouselItemListSchema } from '@/lib/schema';

type CommunitiesPageProps = {
  params: Promise<{ locale: string }>;
};

const path = '/communities';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Las Vegas Communities | Divorce Real Estate',
    description: 'Divorce real estate help across Las Vegas, Henderson, Summerlin, North Las Vegas, and more. Dr. Jan Duffy serves all Nevada communities.',
    alternates: { canonical, languages },
  };
}

export default async function CommunitiesPage(props: CommunitiesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const carouselSchema = generateCarouselItemListSchema(communities, {
    baseUrl: siteUrl,
    priceRange: '$$',
  });

  return (
    <>
      <StructuredData data={carouselSchema} />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Las Vegas Area Communities
          </h1>
          <p className="text-xl text-gray-600">
            Divorce real estate help across Las Vegas, Henderson, and surrounding Nevada communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map(community => (
            <Link
              key={community.href}
              href={community.href}
              className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:border-blue-500 hover:shadow-xl"
              prefetch={true}
            >
              <h2 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                {community.name}
              </h2>
              <p className="text-gray-600">{community.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
