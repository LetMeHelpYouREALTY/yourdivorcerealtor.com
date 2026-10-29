import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { StructuredData } from '@/components/seo/StructuredData';
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { RealScoutHomeValue } from '@/components/widgets/RealScoutHomeValue';
import { generateLocaleAlternates } from '@/lib/metadata';
import {
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IGreenValleyProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-green-valley';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Green Valley Henderson Divorce Realtor | Divorce Real Estate Agent Green Valley NV | Dr. Jan Duffy',
    description: 'Green Valley Henderson divorce realtor helping divorcing homeowners sell houses, manage property division, and plan buyouts with local expertise. Call (702) 500-1955.',
    keywords: 'Green Valley Henderson divorce realtor, divorce real estate agent Green Valley NV, selling house divorce Green Valley, Henderson divorce real estate specialist',
    alternates: { canonical, languages },
  };
}

export default async function GreenValley(props: IGreenValleyProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-green-valley';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Green Valley' }];
  const serviceSchema = generateServiceSchema(
    'Green Valley Divorce Real Estate Services',
    'Green Valley Henderson divorce realtor helping divorcing homeowners sell houses, manage property division, and plan buyouts with local expertise.',
    'Green Valley',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Green Valley Henderson Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Green Valley NV"
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Green Valley Divorce Real Estate Expertise</h2>
          <p>
            Green Valley is one of Henderson's most established and desirable communities, known for nearby schools, master-planned neighborhoods, and strong property values. When you're going through a divorce in Green Valley, you need specialized real estate expertise that understands both the local market and divorce transaction complexities. Dr. Jan Duffy brings this expertise to Green Valley divorcing homeowners.
          </p>

          <h3>Understanding Green Valley's Market</h3>
          <p>
            Green Valley's established nature, nearby public schools, and community amenities create unique market dynamics. Dr. Jan Duffy's deep knowledge of Green Valley ensures accurate valuations and effective transactions that reflect the community's true value.
          </p>

          <h2>Green Valley Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Green Valley homeowners, including accurate valuations, specialized listing processes, and buyout assistance tailored to the Green Valley market.
          </p>

          <h2>Why Choose Dr. Jan Duffy for Green Valley</h2>
          <p>
            Green Valley divorcing homeowners choose Dr. Jan Duffy for her specialized divorce expertise combined with deep local market knowledge. Her approach ensures optimal outcomes for Green Valley property transactions during divorce.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Green Valley property and learn how specialized divorce real estate expertise can support your situation.
          </p>
        </div>
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
