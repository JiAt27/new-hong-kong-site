import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-navy-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-navy-800 group-hover:text-brand-red transition-colors">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-60 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-sm text-navy-600 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}
