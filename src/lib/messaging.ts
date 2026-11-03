/**
 * Key messaging for Dr. Jan Duffy — Las Vegas / Henderson divorce real estate.
 *
 * Voice: direct, warm, specific. Describe the house, the money, and the
 * process. Never describe who lives in a neighborhood.
 */

export const messaging = {
  headlines: {
    primary: 'Dr. Jan Duffy, Divorce Real Estate',
    subtitle: 'Las Vegas divorce real estate specialist',
    unlock: 'Unlock Your New Normal',
    control: 'Get Control of Your Future',
    notUsual: 'This Isn\'t Business As Usual',
    houseKey: 'The house is the largest asset in most Nevada divorces. Decide it well and the rest gets easier.',
    decisions: 'The decisions you make now shape the next ten years.',
    deserveExpert: 'Your home, and your equity in it, deserve a specialist.',
  },

  fourPillars: {
    finances: {
      title: 'FINANCES',
      message: 'The house decision sets your budget for everything that follows: housing, support, and savings.',
    },
    emotions: {
      title: 'EMOTIONS',
      message: 'An unresolved house keeps you in limbo. A signed plan with dates gets you out of it.',
    },
    children: {
      title: 'CHILDREN',
      message: 'Your children need to know where they will live next and when. Settling the house answers that.',
    },
    closure: {
      title: 'CLOSURE',
      message: 'Until the deed changes hands or the sale closes, the divorce is not finished. The house is closure.',
    },
  },

  serviceDifferentiators: {
    neutrality: 'Both spouses get the same information at the same time. No side is favored.',
    divorceProcess: 'A listing process built for divorce: written showing rules, sign-off deadlines, and escrow instructions both attorneys approve.',
    communication: 'One update goes to both spouses and both attorneys, so no one hears news second-hand.',
    timeline: 'You get a dated timeline up front: list date, expected contract date, close date, and move-out date.',
    escalation: 'When one party stops signing or blocks showings, a written escalation protocol gets the sale back on schedule.',
    courtAppointed: 'When appointed by the court, every order is followed to the letter and reported back in writing.',
  },

  warningMessage: 'Most agents apply a standard listing process to a divorce sale. That is how deadlines slip, one spouse stops signing, and the court gets pulled back in. A divorce listing needs its own process.',

  painPoints: [
    'Do I need to sell my home?',
    'Can I afford to keep the house on one income?',
    'Can I refinance a jumbo loan to buy out my spouse?',
    'Where will I live next, and when do I have to move?',
  ],

  valuePropositions: {
    understandOptions: 'Understand Your Options',
    avoidFees: 'Avoid Unnecessary Legal Fees',
    representedFairly: 'Be Represented Fairly',
  },

  ctas: {
    primary: 'Schedule a Confidential Consultation',
    valuation: 'Get Your Free Home Valuation',
    discuss: 'Discuss Your Options Today',
    urgency: 'It\'s Never Too Early to Plan',
    control: 'Take Control of Your Future Today',
  },

  process: {
    step1: 'Discovery Call',
    step2: 'Home Valuation',
    step3: 'Options Analysis',
    step4: 'Strategy Development',
    step5: 'Execution',
    step6: 'Closing and Transition',
  },

  options: {
    sell: 'Sell and split the net proceeds',
    buyout: 'One spouse buys out the other',
    coOwn: 'Co-own for a set period (bird nesting)',
    refinance: 'Refinance to remove one spouse from the loan',
    shortSale: 'Short sale if the loan exceeds the value',
  },
} as const;
