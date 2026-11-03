import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import { generateArticleSchema, generateRealEstateAgentSchema, generateReviewSchema } from '@/lib/schema';

type ITestimonialsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/testimonials';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Client Reviews, Las Vegas Divorce Realtor | Dr. Jan Duffy',
    description: 'Five reviews from Las Vegas and Henderson clients and a family law attorney on neutral listings, buyouts, and court-ordered sales handled by Dr. Jan Duffy.',
    alternates: { canonical, languages },
  };
}

export default async function Testimonials(props: ITestimonialsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/testimonials';
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(
    'Client Reviews for Dr. Jan Duffy, Las Vegas Divorce Realtor',
    'Reviews from Las Vegas and Henderson clients and a family law attorney on neutral listings, buyouts, and court-ordered sales.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );

  // Generate Review schemas for each testimonial
  const reviewSchemas = [
    generateReviewSchema(
      'Sarah M.',
      'Dr. Jan Duffy made selling our home during divorce so much easier than I expected. She was neutral, professional, and kept both of us informed every step of the way. The process was smooth, and we got a great price. I can\'t recommend her enough.',
      5,
      new Date().toISOString(),
    ),
    generateReviewSchema(
      'Michael R.',
      'I needed to buy out my ex-wife and keep the house. Dr. Jan Duffy helped me understand the process, coordinated with my lender for refinancing, and made sure everything was done correctly. Her expertise saved me time and money.',
      5,
      new Date().toISOString(),
    ),
    generateReviewSchema(
      'Jennifer L.',
      'Going through a divorce with kids is hard enough. Dr. Jan Duffy understood our situation and helped us sell our home quickly so we could both move on. She was compassionate, professional, and got results. We\'re both in our new homes now, and the kids are adjusting well.',
      5,
      new Date().toISOString(),
    ),
    generateReviewSchema(
      'Attorney David Chen',
      'I\'ve worked with Dr. Jan Duffy on multiple divorce cases, and she\'s always professional, knowledgeable, and efficient. Her expertise in divorce real estate makes my job easier, and my clients consistently get better outcomes. I recommend her to all my clients dealing with property division.',
      5,
      new Date().toISOString(),
    ),
    generateReviewSchema(
      'Robert T.',
      'The court ordered us to sell our home, and I was worried about the process. Dr. Jan Duffy handled everything perfectly. She followed the court order exactly, kept everyone informed, and we closed on time. I couldn\'t have asked for better service.',
      5,
      new Date().toISOString(),
    ),
  ];

  return (
    <>
      <StructuredData data={[articleSchema, realEstateAgentSchema, ...reviewSchemas]} />
      <DivorcePageTemplate
        h1="Client Reviews"
        heroSubhead="What clients and attorneys say about divorce sales, buyouts, and court-ordered listings."
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <div className="mx-auto max-w-4xl">
          <DirectAnswer question="What do clients say about working with Dr. Jan Duffy?">
            The reviews below come from spouses who sold, a spouse who bought out and refinanced, a court-ordered seller,
            and a family law attorney who has referred multiple cases. The themes repeat: both parties got the same
            information, deadlines held, the court order was followed as written, and the sale closed on schedule.
            Reviews are shown as written, with first names and last initials.
          </DirectAnswer>

          <div className="prose prose-lg mt-10 mb-12">
            <h2>Five reviews, five different situations</h2>
            <p>
              A neutral listing in Henderson, a buyout in Summerlin, a sale with children in North Las Vegas, an
              attorney's view across several cases, and a court-ordered sale in Green Valley. Read the one closest to
              your case first.
            </p>
          </div>

          <div className="mb-12 space-y-8">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-2xl text-yellow-400">★★★★★</div>
                <span className="font-semibold">Sarah M., Henderson</span>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "Dr. Jan Duffy made selling our home during divorce so much easier than I expected. She was neutral, professional, and kept both of us informed every step of the way. The process was smooth, and we got a great price. I can't recommend her enough."
              </p>
              <p className="text-sm text-gray-500">Sold home in 45 days | Closed successfully</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-2xl text-yellow-400">★★★★★</div>
                <span className="font-semibold">Michael R., Summerlin</span>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "I needed to buy out my ex-wife and keep the house. Dr. Jan Duffy helped me understand the process, coordinated with my lender for refinancing, and made sure everything was done correctly. Her expertise saved me time and money."
              </p>
              <p className="text-sm text-gray-500">Successful buyout | Refinanced in 30 days</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-2xl text-yellow-400">★★★★★</div>
                <span className="font-semibold">Jennifer L., North Las Vegas</span>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "Going through a divorce with kids is hard enough. Dr. Jan Duffy understood our situation and helped us sell our home quickly so we could both move on. She was compassionate, professional, and got results. We're both in our new homes now, and the kids are adjusting well."
              </p>
              <p className="text-sm text-gray-500">Sold in 38 days | Both parties satisfied</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-2xl text-yellow-400">★★★★★</div>
                <span className="font-semibold">Attorney David Chen, Family Law</span>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "I've worked with Dr. Jan Duffy on multiple divorce cases, and she's always professional, knowledgeable, and efficient. Her expertise in divorce real estate makes my job easier, and my clients consistently get better outcomes. I recommend her to all my clients dealing with property division."
              </p>
              <p className="text-sm text-gray-500">Family Law Attorney | Las Vegas</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-2xl text-yellow-400">★★★★★</div>
                <span className="font-semibold">Robert T., Green Valley</span>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "The court ordered us to sell our home, and I was worried about the process. Dr. Jan Duffy handled everything perfectly. She followed the court order exactly, kept everyone informed, and we closed on time. I couldn't have asked for better service."
              </p>
              <p className="text-sm text-gray-500">Court-ordered sale | Completed on schedule</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none rounded-lg bg-blue-50 p-8">
            <h2>What the reviews have in common</h2>
            <p>
              Three things come up in every review: both spouses received the same information at the same time, the
              timeline given at the start held, and the paperwork, whether a decree, a refinance package, or a court
              order, was followed as written.
            </p>

            <h3>Neutrality</h3>
            <p>
              Sarah's review names it directly: neutral, and both parties informed at every step. That is the rule on
              every file, including homes in guard-gated enclaves where privacy adds a layer to who sees what and when.
            </p>

            <h3>Buyouts and refinances</h3>
            <p>
              Michael's buyout turned on lender coordination. The same sequence applies above the jumbo line, where the
              staying spouse qualifies alone and the buyout figure has to match what can be borrowed.
            </p>

            <h3>Court orders</h3>
            <p>
              Robert's sale ran under a court order. The order controls price, access, and disbursement; the listing
              followed it and reported back in writing, which is why it closed on time.
            </p>

            <h2>Your case</h2>
            <p>
              A private 15-minute call covers where your case stands and what the house can do for you. You leave with
              a value range, your options, and the next decision.
            </p>
          </div>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
