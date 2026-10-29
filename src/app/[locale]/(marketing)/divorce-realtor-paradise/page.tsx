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

type IParadiseProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-paradise';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Paradise Las Vegas Divorce Realtor | Divorce Real Estate Agent Paradise NV | Dr. Jan Duffy',
    description: 'Paradise Las Vegas divorce realtor providing property division guidance, house sale strategy, and neutral representation for divorcing homeowners. Call (702) 500-1955.',
    keywords: 'Paradise Las Vegas divorce realtor, divorce real estate agent Paradise NV, selling house divorce Paradise, Las Vegas Strip area divorce realtor',
    alternates: { canonical, languages },
  };
}

export default async function Paradise(props: IParadiseProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-paradise';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Paradise' }];
  const serviceSchema = generateServiceSchema(
    'Paradise Divorce Real Estate Services',
    'Paradise Las Vegas divorce realtor providing property division guidance, house sale strategy, and neutral representation for divorcing homeowners.',
    'Paradise',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Paradise Las Vegas Divorce Realtor"
        heroSubhead="Divorce Real Estate Agent Paradise NV"
        showHomeValue
        currentPath={currentPath}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Paradise Divorce Real Estate Expertise</h2>
          <p>
            Paradise offers diverse housing options and central Las Vegas location. When going through divorce in Paradise, you need specialized real estate expertise. Dr. Jan Duffy provides comprehensive divorce real estate services for Paradise homeowners.
          </p>

          <h2>Paradise Divorce Services</h2>
          <p>
            Dr. Jan Duffy provides comprehensive divorce real estate services for Paradise homeowners, ensuring your property transaction supports your overall divorce resolution.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Schedule a confidential consultation with Dr. Jan Duffy to discuss your Paradise property.
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
