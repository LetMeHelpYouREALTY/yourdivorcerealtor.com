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

type IAlianteProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-aliante';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Aliante North Las Vegas Divorce Realtor | Divorce Real Estate Agent Aliante NV | Dr. Jan Duffy',
    description: 'Aliante North Las Vegas divorce realtor guiding homeowners through property division, buyouts, and home sales during divorce. Call (702) 500-1955.',
    keywords: 'Aliante North Las Vegas divorce realtor, divorce real estate agent Aliante NV, selling house divorce Aliante, North Las Vegas divorce property specialist',
    alternates: { canonical, languages },
  };
}

export default async function Aliante(props: IAlianteProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-aliante';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Aliante' }];
  const serviceSchema = generateServiceSchema(
    'Aliante Divorce Real Estate Services',
    'Aliante North Las Vegas divorce realtor guiding homeowners through property division, buyouts, and home sales during divorce.',
    'Aliante',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Aliante North Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Aliante NV"
        showHomeValue
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Aliante Divorce Real Estate Expertise</h2>
          <p>
            Aliante is a master-planned community in North Las Vegas offering neighborhoods. When going through divorce in Aliante, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Aliante homeowners.
          </p>

          <h2>Aliante Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Aliante homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Aliante property.
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
