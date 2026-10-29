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

type ICentennialHillsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-centennial-hills';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Centennial Hills Las Vegas Divorce Realtor | Divorce Real Estate Agent Centennial Hills NV | Dr. Jan Duffy',
    description: 'Centennial Hills Las Vegas divorce realtor helping with home valuations, selling house during divorce, and property division. Call (702) 222-1964.',
    keywords: 'Centennial Hills Las Vegas divorce realtor, divorce real estate agent Centennial Hills NV, selling house divorce Centennial Hills, northwest Las Vegas divorce realtor',
    alternates: { canonical, languages },
  };
}

export default async function CentennialHills(props: ICentennialHillsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-centennial-hills';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Centennial Hills' }];
  const serviceSchema = generateServiceSchema(
    'Centennial Hills Divorce Real Estate Services',
    'Centennial Hills Las Vegas divorce realtor helping with home valuations, selling house during divorce, and property division.',
    'Centennial Hills',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Centennial Hills Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Centennial Hills NV"
        showHomeValue
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Centennial Hills Divorce Real Estate Expertise</h2>
          <p>
            Centennial Hills offers newer developments and communities in northwest Las Vegas. When going through divorce in Centennial Hills, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Centennial Hills homeowners.
          </p>

          <h2>Centennial Hills Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Centennial Hills homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Centennial Hills property.
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
