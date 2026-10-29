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

type ISouthernHighlandsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-southern-highlands';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Southern Highlands Las Vegas Divorce Realtor | Divorce Real Estate Agent Southern Highlands NV | Dr. Jan Duffy',
    description: 'Southern Highlands Las Vegas divorce realtor specializing in luxury home sales during divorce, fair buyouts, and neutral representation. Call (702) 500-1955.',
    keywords: 'Southern Highlands Las Vegas divorce realtor, divorce real estate agent Southern Highlands NV, luxury divorce realtor Las Vegas, selling house divorce Southern Highlands',
    alternates: { canonical, languages },
  };
}

export default async function SouthernHighlands(props: ISouthernHighlandsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-southern-highlands';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Southern Highlands' }];
  const serviceSchema = generateServiceSchema(
    'Southern Highlands Divorce Real Estate Services',
    'Southern Highlands Las Vegas divorce realtor specializing in luxury home sales during divorce, fair buyouts, and neutral representation.',
    'Southern Highlands',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Southern Highlands Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Southern Highlands NV"
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Southern Highlands Divorce Real Estate Expertise</h2>
          <p>
            Southern Highlands is a premier master-planned community known for luxury homes and excellent amenities. When going through divorce in Southern Highlands, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Southern Highlands homeowners.
          </p>

          <h2>Southern Highlands Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Southern Highlands homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Southern Highlands property.
          </p>
        </div>
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
