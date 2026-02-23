import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import CloudDivider from './components/ui/CloudDivider';
import Hero from './components/sections/Hero';
import Products from './components/sections/Products';
import WhySpecial from './components/sections/WhySpecial';
import HowToOrder from './components/sections/HowToOrder';
import Testimonials from './components/sections/Testimonials';
import OurStory from './components/sections/OurStory';
import HowToCook from './components/sections/HowToCook';
import FAQ from './components/sections/FAQ';
import WhereToBuy from './components/sections/WhereToBuy';

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-red focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <CloudDivider topColor="transparent" bottomColor="var(--color-brand-cream)" />
        <Products />
        <CloudDivider topColor="var(--color-brand-cream)" bottomColor="var(--color-navy-500)" />
        <WhySpecial />
        <CloudDivider topColor="var(--color-navy-500)" bottomColor="var(--color-brand-cream)" flip />
        <HowToOrder />
        <Testimonials />
        <OurStory />
        <HowToCook />
        <CloudDivider topColor="var(--color-brand-cream)" bottomColor="white" />
        <FAQ />
        <CloudDivider topColor="white" bottomColor="var(--color-brand-cream)" />
        <WhereToBuy />
        <CloudDivider topColor="var(--color-brand-cream)" bottomColor="var(--color-navy-500)" />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
