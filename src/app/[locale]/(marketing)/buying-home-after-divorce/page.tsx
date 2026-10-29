import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { StructuredData } from '@/components/seo/StructuredData';
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IBuyingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/buying-home-after-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Buying a Home After Divorce in Las Vegas | Dr. Jan Duffy',
    description: 'Expert guidance for buying a home after divorce in Las Vegas. Your fresh start awaits with specialized support for post-divorce home buying.',
    keywords: 'buying home after divorce, post divorce home purchase, las vegas divorce home buying',
    alternates: { canonical, languages },
  };
}

export default async function BuyingAfterDivorce(props: IBuyingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/buying-home-after-divorce';
  const articleSchema = generateArticleSchema(
    'Buying a Home After Divorce in Las Vegas',
    'Expert guidance for buying a home after divorce in Las Vegas. Your fresh start awaits with specialized support for post-divorce home buying.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Post-Divorce Home Buying Services',
    'Expert guidance for buying a home after divorce in Las Vegas. Specialized support for post-divorce home buying.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Buying a Home After Divorce in Las Vegas"
        heroSubhead="Your Fresh Start Awaits"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Starting Fresh After Divorce</h2>
          <p>
            Buying a home after divorce represents a new beginning—a chance to create a space that's truly yours and build a new life. But post-divorce home buying comes with unique considerations, from financial qualifications to timing relative to your divorce proceedings. Dr. Jan Duffy provides specialized guidance for buying a home after divorce in
            {' '}
            <Link href="/divorce-realtor-henderson" className="text-blue-600 underline hover:text-blue-700">Las Vegas</Link>
            , helping you make informed decisions and find the perfect property for your fresh start.
          </p>

          <h3>The Emotional Journey</h3>
          <p>
            Buying a home after divorce is often an emotional journey. It's about creating a new space, establishing independence, and moving forward. Dr. Jan Duffy understands this emotional component and provides compassionate, supportive service that acknowledges the significance of this step while helping you make practical, informed decisions.
          </p>

          <h2>Financial Considerations for Post-Divorce Home Buying</h2>
          <p>
            Your financial situation after divorce may be different from before. Understanding your new financial reality is essential for successful home buying. Dr. Jan Duffy helps you understand your financial position and navigate the mortgage qualification process.
          </p>

          <h3>Mortgage Qualification</h3>
          <p>
            Qualifying for a mortgage after divorce requires understanding how your income, assets, and debts have changed. Lenders will evaluate your financial situation based on your post-divorce circumstances. Dr. Jan Duffy can help you understand what lenders look for and connect you with mortgage professionals who understand divorce situations. Learn more about
            {' '}
            <Link href="/divorce-and-mortgage" className="text-blue-600 underline hover:text-blue-700">divorce and mortgage</Link>
            {' '}
            considerations.
          </p>

          <h3>Down Payment Considerations</h3>
          <p>
            Your down payment may come from property division proceeds, savings, or other sources. Understanding how to structure your down payment and what documentation lenders need is important. Dr. Jan Duffy helps you navigate these considerations and ensures you're prepared for the mortgage process.
          </p>

          <h2>Timing Your Purchase</h2>
          <p>
            Timing your home purchase relative to your divorce proceedings matters. Buying before your divorce is final has different implications than buying after. Dr. Jan Duffy helps you understand these timing considerations and plan accordingly.
          </p>

          <h3>Buying Before Divorce is Final</h3>
          <p>
            If you're buying before your divorce is final, the purchase may be considered marital property depending on your state's laws and your specific circumstances. Dr. Jan Duffy can help you understand these implications and coordinate with your attorney to ensure the purchase supports your overall divorce resolution.
          </p>

          <h3>Buying After Divorce is Final</h3>
          <p>
            Buying after your divorce is final is often simpler from a legal perspective, as the property is clearly yours. However, you may need to wait for property division proceeds or other financial arrangements to be finalized. Dr. Jan Duffy helps you understand these timing considerations and plan your purchase accordingly.
          </p>

          <h2>Finding the Right Property</h2>
          <p>
            Finding the right property after divorce means finding a home that fits your new life, whether that's a fresh start, a larger home with more bedrooms, or a downsized property that's easier to manage. Dr. Jan Duffy helps you identify what you need and find properties that fit.
          </p>

          <h3>Single-Family Homes</h3>
          <p>
            Finding a home with the space, layout, and commute you need matters. Dr. Jan Duffy helps you compare square footage, bedrooms, and drive times.
          </p>

          <h3>Condos and Townhomes for Downsizing</h3>
          <p>
            Many people choose to downsize after divorce, opting for condos or townhomes that require less maintenance and offer more flexibility. Dr. Jan Duffy helps you explore these options and find properties that fit your new lifestyle.
          </p>

          <h2>The Buying Process</h2>
          <p>
            Dr. Jan Duffy guides you through the entire home buying process, from initial search to closing. Her expertise ensures you make informed decisions and navigate the process smoothly.
          </p>

          <h3>Property Search</h3>
          <p>
            Your property search begins with understanding your needs, budget, and preferences. Dr. Jan Duffy helps you define these parameters and searches for properties that fit. She understands the Las Vegas market and can help you find properties in neighborhoods that work for your new life.
          </p>

          <h3>Making Offers</h3>
          <p>
            When you find the right property, Dr. Jan Duffy helps you craft competitive offers that protect your interests. She understands negotiation strategies and helps you navigate the offer process effectively.
          </p>

          <h3>Home Inspections and Due Diligence</h3>
          <p>
            Home inspections and due diligence are critical for protecting your investment. Dr. Jan Duffy helps you understand inspection reports, negotiate repairs, and ensure you're making an informed decision about the property.
          </p>

          <h3>Closing</h3>
          <p>
            Closing on your new home is the final step in your fresh start. Dr. Jan Duffy coordinates the closing process, ensuring all documentation is correct and the transaction proceeds smoothly. She understands the importance of this moment and helps make it as stress-free as possible.
          </p>

          <h2>Special Considerations</h2>
          <p>
            Post-divorce home buying has special considerations that don't exist in traditional transactions. Dr. Jan Duffy helps you navigate these considerations and ensures your purchase supports your overall situation.
          </p>

          <h3>Coordination with Divorce Proceedings</h3>
          <p>
            If you're buying before your divorce is final, coordination with your divorce proceedings is important. Dr. Jan Duffy works with your attorney to ensure the purchase aligns with your divorce case and doesn't complicate property division.
          </p>

          <h3>Property Division Proceeds</h3>
          <p>
            If you're using property division proceeds for your down payment, timing and documentation matter. Dr. Jan Duffy helps you understand how to use these proceeds and ensures proper documentation for lenders.
          </p>

          <h2>Get Started on Your Fresh Start</h2>
          <p>
            Buying a home after divorce is an important step in moving forward. Dr. Jan Duffy is here to help you navigate this process with expertise and compassion. Schedule a consultation today and start exploring your options for your new beginning in Las Vegas.
          </p>
        </div>
      </DivorcePageTemplate>
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
