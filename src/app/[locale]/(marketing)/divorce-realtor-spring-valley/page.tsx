import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateLocaleAlternates } from '@/lib/metadata';
import {
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type ISpringValleyProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-spring-valley';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Spring Valley Las Vegas Divorce Realtor | Divorce Real Estate Agent Spring Valley NV | Dr. Jan Duffy',
    description: 'Spring Valley Las Vegas divorce realtor helping with property division, selling houses during divorce, and neutral representation. Call (702) 500-1955.',
    keywords: 'Spring Valley Las Vegas divorce realtor, divorce real estate agent Spring Valley NV, selling house divorce Spring Valley, Las Vegas divorce property division',
    alternates: { canonical, languages },
  };
}

export default async function SpringValley(props: ISpringValleyProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-spring-valley';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Spring Valley' }];
  const serviceSchema = generateServiceSchema(
    'Spring Valley Divorce Real Estate Services',
    'Spring Valley Las Vegas divorce realtor helping with property division, selling houses during divorce, and neutral representation.',
    'Spring Valley',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Spring Valley Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Spring Valley NV"
        showHomeValue
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Spring Valley Divorce Real Estate Expertise</h2>
          <p>
            Spring Valley offers diverse housing options and convenient location within Las Vegas. When going through divorce in Spring Valley, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Spring Valley homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h3>Understanding Spring Valley's Market</h3>
          <p>
            Spring Valley's diverse neighborhoods and convenient location create unique market dynamics. Dr. Jan Duffy's knowledge of Spring Valley ensures accurate valuations and effective transactions.
          </p>

          <h2>Spring Valley Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Spring Valley homeowners, including accurate valuations, specialized listing processes, and property division assistance.
          </p>

          <h2>Why Choose Dr. Jan Duffy</h2>
          <p>
            Spring Valley divorcing homeowners choose Dr. Jan Duffy for specialized expertise and local market knowledge. Schedule a consultation today.
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
