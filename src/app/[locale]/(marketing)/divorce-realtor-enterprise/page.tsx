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

type IEnterpriseProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-enterprise';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Enterprise Las Vegas Divorce Realtor | Divorce Real Estate Agent Enterprise NV | Dr. Jan Duffy',
    description: 'Enterprise Las Vegas divorce realtor helping divorcing homeowners sell houses, negotiate buyouts, and manage property division. Call (702) 500-1955.',
    keywords: 'Enterprise Las Vegas divorce realtor, divorce real estate agent Enterprise NV, selling house divorce Enterprise, Las Vegas divorce property division expert',
    alternates: { canonical, languages },
  };
}

export default async function Enterprise(props: IEnterpriseProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-enterprise';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Enterprise' }];
  const serviceSchema = generateServiceSchema(
    'Enterprise Divorce Real Estate Services',
    'Enterprise Las Vegas divorce realtor helping divorcing homeowners sell houses, negotiate buyouts, and manage property division.',
    'Enterprise',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Enterprise Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Enterprise NV"
        showHomeValue
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Enterprise Divorce Real Estate Expertise</h2>
          <p>
            Enterprise offers growing neighborhoods and master-planned communities. When going through divorce in Enterprise, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Enterprise homeowners.
          </p>

          <h2>Enterprise Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Enterprise homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Enterprise property and learn how specialized divorce real estate expertise can support your situation.
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
