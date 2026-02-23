import type { Testimonial } from '../../data/testimonials';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100 h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-navy-700 leading-relaxed flex-1 mb-4">
        "{testimonial.quote}"
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="font-display font-bold text-sm text-navy-800">{testimonial.name}</p>
        {testimonial.product && (
          <span className="text-xs text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full">
            {testimonial.product}
          </span>
        )}
      </div>
    </div>
  );
}
