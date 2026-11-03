import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '@/lib/site-contact';

type Step = {
  title: string;
  detail: string;
};

type NextStepsProps = {
  title?: string;
  steps: Step[];
  /** One sentence naming what the reader gets on the call. */
  callPromise: string;
};

/**
 * Numbered process block followed by a single call to action.
 * One CTA per page section; the phone shown is the site's own number.
 */
export function NextSteps({ title = 'How this works with Dr. Jan Duffy', steps, callPromise }: NextStepsProps) {
  return (
    <section aria-label={title} className="rounded-xl bg-gray-900 p-6 text-white sm:p-8">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold">{index + 1}</span>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-gray-300">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col items-start gap-4 border-t border-gray-700 pt-6 sm:flex-row sm:items-center">
        <CalendlyLink className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400">
          Schedule a private 15-minute call
        </CalendlyLink>
        <p className="text-gray-300">
          {callPromise}
          {' '}
          Or call
          {' '}
          <a href={SITE_PHONE_TEL} className="font-semibold text-white underline">{SITE_PHONE_DISPLAY}</a>
          .
        </p>
      </div>
    </section>
  );
}
