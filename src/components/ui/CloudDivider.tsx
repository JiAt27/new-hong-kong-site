export default function CloudDivider({
  topColor = 'var(--color-brand-cream)',
  bottomColor = 'var(--color-navy-500)',
  flip = false,
  className = '',
}: {
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full leading-[0] overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <rect width="1440" height="80" fill={topColor} />
        <path
          d="M0 55 C60 40, 100 25, 170 35 C240 45, 220 58, 300 50 C380 42, 420 25, 500 38 C580 51, 560 62, 640 52 C720 42, 760 28, 840 40 C920 52, 900 62, 980 52 C1060 42, 1100 28, 1180 40 C1260 52, 1240 60, 1320 50 C1400 40, 1420 48, 1440 45 L1440 80 L0 80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
