import { FAQAccordion } from '@/components/faq/FAQAccordion';

export type PageFAQItem = {
  question: string;
  answer: string;
};

type PageFAQProps = {
  title?: string;
  faqs: PageFAQItem[];
};

/**
 * Visible question-and-answer section for a page.
 * Google retired FAQ rich results on May 7, 2026, so the value is the visible answers,
 * not the markup. Pages may still pass the same list to generateFAQPageSchema.
 */
export function PageFAQ({ title = 'Questions people ask', faqs }: PageFAQProps) {
  if (faqs.length === 0) {
    return null;
  }
  return (
    <section aria-label={title}>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
      <FAQAccordion faqs={faqs} />
    </section>
  );
}
